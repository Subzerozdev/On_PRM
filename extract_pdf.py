import fitz  # PyMuPDF
import os

pdf_dir = r"c:\On_PRM\Picture"
output_dir = r"c:\On_PRM\pdf_text_output"
os.makedirs(output_dir, exist_ok=True)

pdf_files = sorted([f for f in os.listdir(pdf_dir) if f.endswith('.pdf')])

print(f"Found {len(pdf_files)} PDF files\n")

summary = []
for pdf_file in pdf_files:
    pdf_path = os.path.join(pdf_dir, pdf_file)
    doc = fitz.open(pdf_path)
    page_count = len(doc)
    
    text_content = ""
    for page_num, page in enumerate(doc):
        text = page.get_text()
        text_content += f"--- Page {page_num + 1} ---\n"
        text_content += text + "\n"
    
    doc.close()
    
    # Save to text file
    output_file = os.path.join(output_dir, pdf_file.replace('.pdf', '.txt'))
    with open(output_file, 'w', encoding='utf-8') as f:
        f.write(text_content)
    
    char_count = len(text_content)
    summary.append((pdf_file, page_count, char_count))
    print(f"  {pdf_file} | {page_count} pages | {char_count} chars")

print(f"\n{'='*60}")
print(f"TOTAL: {len(pdf_files)} files, {sum(s[1] for s in summary)} pages, {sum(s[2] for s in summary)} chars")
print(f"Output dir: {output_dir}")
