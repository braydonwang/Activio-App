from PIL import Image
import base64
from io import BytesIO
import io
import sys
import torch
import pickle
import torch.nn as nn
import torch.nn.functional as F
import torchvision.transforms as tt


class ImageClassificationBase(nn.Module):
    def training_step(self, batch):
        "calculate loss for batch of data"
        images, labels = batch
        out = self(images)                  # Generate predictions
        loss = F.cross_entropy(out, labels)  # Calculate loss
        return loss

    def validation_step(self, batch):
        "calculate loss & accuracy for a batch of validation data"
        images, labels = batch
        out = self(images)                    # Generate predictions
        loss = F.cross_entropy(out, labels)   # Calculate loss
        acc = accuracy(out, labels)           # Calculate accuracy
        return {'val_loss': loss.detach(), 'val_acc': acc}

    def validation_epoch_end(self, outputs):
        batch_losses = [x['val_loss'] for x in outputs]
        epoch_loss = torch.stack(batch_losses).mean()   # Combine losses
        batch_accs = [x['val_acc'] for x in outputs]
        epoch_acc = torch.stack(batch_accs).mean()      # Combine accuracies
        return {'val_loss': epoch_loss.item(), 'val_acc': epoch_acc.item()}

    def epoch_end(self, epoch, result):
        print("Epoch [{}], train_loss: {:.4f}, val_loss: {:.4f}, val_acc: {:.4f}".format(
            epoch, result['train_loss'], result['val_loss'], result['val_acc']))


def accuracy(outputs, labels):
    _, preds = torch.max(outputs, dim=1)
    return torch.tensor(torch.sum(preds == labels).item() / len(preds))


def conv_block(in_channels, out_channels, pool=False):
    layers = [nn.Conv2d(in_channels, out_channels, kernel_size=3, padding=1),
              nn.BatchNorm2d(out_channels),
              nn.ReLU(inplace=True)]
    if pool:
        layers.append(nn.MaxPool2d(2))
    return nn.Sequential(*layers)


class ResNet9(ImageClassificationBase):
    def __init__(self, in_channels, num_classes):
        super().__init__()
        # Input: 128 x 3 x 64 x 64
        self.conv1 = conv_block(in_channels, 64)  # 128 x 64 x 64 x 64
        self.conv2 = conv_block(64, 128, pool=True)  # 128 x 128 x 32 x 32
        self.res1 = nn.Sequential(conv_block(128, 128),  # 128 x 128 x 32 x 32
                                  conv_block(128, 128))  # 128 x 128 x 32 x 32

        self.conv3 = conv_block(128, 256, pool=True)  # 128 x 256 x 16 x 16
        self.conv4 = conv_block(256, 512, pool=True)  # 128 x 512 x 8 x 8
        self.res2 = nn.Sequential(conv_block(512, 512),  # 128 x 512 x 8 x 8
                                  conv_block(512, 512))  # 128 x 512 x 8 x 8

        self.classifier = nn.Sequential(nn.AdaptiveMaxPool2d(1),  # 128 x 512 x 2 x 2
                                        nn.Flatten(),  # 128 x 512
                                        nn.Dropout(0.2),
                                        nn.Linear(512, num_classes))

    def forward(self, xb):
        out = self.conv1(xb)
        out = self.conv2(out)
        out = self.res1(out) + out
        out = self.conv3(out)
        out = self.conv4(out)
        out = self.res2(out) + out
        out = self.classifier(out)
        return out


def get_default_device():
    """Pick GPU if available, else CPU"""
    if torch.cuda.is_available():
        return torch.device('cuda')
    else:
        return torch.device('cpu')


def to_device(data, device):
    """Move tensor(s) to chosen device"""
    if isinstance(data, (list, tuple)):
        return [to_device(x, device) for x in data]
    return data.to(device, non_blocking=True)


device = get_default_device()


def predict_image(img, model, classes):
    # Convert to a batch of 1
    xb = to_device(img.unsqueeze(0), device)
    # Get predictions from model
    yb = model(xb)
    # Pick index with highest probability
    _, preds = torch.max(yb, dim=1)
    # Retrieve the class label
    return classes[preds[0].item()]


class CPU_Unpickler(pickle.Unpickler):
    def find_class(self, module, name):
        if module == 'torch.storage' and name == '_load_from_bytes':
            return lambda b: torch.load(io.BytesIO(b), map_location='cpu')
        else:
            return super().find_class(module, name)


classes = ['Parasitized', 'Uninfected']
model = CPU_Unpickler('model.pkl').load()
im_b64 = input()
im_bytes = base64.b64decode(im_b64)
im_file = BytesIO(im_bytes)
img = Image.open(im_file)
data_transforms = tt.Compose([tt.Resize(64), tt.RandomCrop(64), tt.ToTensor()])
img = data_transforms(img)
pred = predict_image(img, model, classes)

print(pred)
