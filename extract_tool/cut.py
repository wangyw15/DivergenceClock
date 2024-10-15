from pathlib import Path
from PIL import Image

START_POINT = (435, 339)
TUBE_SIZE = (131, 402)
MARGIN = 1
TUBE_COUNT = 8

images_path = Path('assets')
save_path = Path('parts')

part_index = 0
for image_path in images_path.glob('*.png'):
    print(image_path)
    for i in range(TUBE_COUNT):
        image = Image.open(image_path)
        x, y = START_POINT
        w, h = TUBE_SIZE
        x += i * w + i * MARGIN
        cropped_image = image.crop((x, y, x + w, y + h))
        cropped_image.save(save_path / f'{part_index}.png')
        part_index += 1
