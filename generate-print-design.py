#!/usr/bin/env python3
from PIL import Image, ImageDraw, ImageFont
import sys

# Create canvas at 300 DPI (3600x2400 = 12" x 8")
width, height = 3600, 2400
img = Image.new('RGBA', (width, height), (255, 255, 255, 0))
draw = ImageDraw.Draw(img)

# Colors
text_color = (26, 26, 26, 255)

# Font settings
base_font_size = 120
line_height = int(base_font_size * 1.65)
label_width = int(base_font_size * 5.8)

# Try to load system fonts
try:
    font_bold = ImageFont.truetype("/System/Library/Fonts/Supplemental/Calibri Bold.ttf", base_font_size)
    font_regular = ImageFont.truetype("/System/Library/Fonts/Supplemental/Calibri.ttf", base_font_size)
except:
    try:
        font_bold = ImageFont.truetype("/System/Library/Fonts/Helvetica.ttc", base_font_size)
        font_regular = ImageFont.truetype("/System/Library/Fonts/Helvetica.ttc", base_font_size)
    except:
        # Fallback to default
        font_bold = ImageFont.load_default()
        font_regular = ImageFont.load_default()
        print("⚠️  Warning: Could not load Calibri font, using fallback")

y = int(base_font_size * 1.5)

# Top rule
draw.line([(0, y), (width, y)], fill=text_color, width=2)
y += int(base_font_size * 1.8)

# From:
draw.text((0, y), 'From:', fill=text_color, font=font_bold, anchor='lm')
draw.text((label_width, y), 'Elon Musk <', fill=text_color, font=font_regular, anchor='lm')

# Redacted email
redact_x = label_width + draw.textlength('Elon Musk <', font=font_regular)
redact_width = base_font_size * 7.9
redact_y_top = y - base_font_size * 0.45
redact_y_bottom = y + base_font_size * 0.3
draw.rectangle(
    [(redact_x, redact_y_top), (redact_x + redact_width, redact_y_bottom)],
    fill=text_color
)
draw.text((redact_x + redact_width + base_font_size * 0.15, y), '>', fill=text_color, font=font_regular, anchor='lm')

y += line_height

# Sent:
draw.text((0, y), 'Sent:', fill=text_color, font=font_bold, anchor='lm')
draw.text((label_width, y), 'Sunday, November 25, 2012 12:36 AM', fill=text_color, font=font_regular, anchor='lm')
y += line_height

# To:
draw.text((0, y), 'To:', fill=text_color, font=font_bold, anchor='lm')
draw.text((label_width, y), 'Jeffrey Epstein', fill=text_color, font=font_regular, anchor='lm')
y += line_height

# Subject:
draw.text((0, y), 'Subject:', fill=text_color, font=font_bold, anchor='lm')
draw.text((label_width, y), 'RE:', fill=text_color, font=font_regular, anchor='lm')
y += int(line_height * 2.2)

# Body
draw.text((0, y), 'What day/night will be the wildest party on your island?', fill=text_color, font=font_regular, anchor='lm')

# Save as PNG
img.save('print-design.png', 'PNG', dpi=(300, 300))
print('✅ Print-ready design created: print-design.png')
print('   Dimensions: 3600 x 2400 pixels (12" x 8" at 300 DPI)')
print('   Ready to upload to Gelato or use in automation!')
