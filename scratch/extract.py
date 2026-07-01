import sys

def extract_pdf_text(pdf_path, txt_path):
    try:
        import pypdf
        reader = pypdf.PdfReader(pdf_path)
        text = ""
        for i, page in enumerate(reader.pages):
            text += f"--- Page {i+1} ---\n"
            text += page.extract_text() + "\n"
        with open(txt_path, "w", encoding="utf-8") as f:
            f.write(text)
        print("Successfully extracted using pypdf")
        return True
    except ImportError:
        pass

    try:
        import PyPDF2
        reader = PyPDF2.PdfReader(pdf_path)
        text = ""
        for i, page in enumerate(reader.pages):
            text += f"--- Page {i+1} ---\n"
            text += page.extract_text() + "\n"
        with open(txt_path, "w", encoding="utf-8") as f:
            f.write(text)
        print("Successfully extracted using PyPDF2")
        return True
    except ImportError:
        pass

    try:
        import pdfplumber
        with pdfplumber.open(pdf_path) as pdf:
            text = ""
            for i, page in enumerate(pdf.pages):
                text += f"--- Page {i+1} ---\n"
                text += page.extract_text() + "\n"
        with open(txt_path, "w", encoding="utf-8") as f:
            f.write(text)
        print("Successfully extracted using pdfplumber")
        return True
    except ImportError:
        pass

    print("Failed to import any PDF library. Trying to install pypdf...")
    import subprocess
    subprocess.check_call([sys.executable, "-m", "pip", "install", "pypdf"])
    try:
        import pypdf
        reader = pypdf.PdfReader(pdf_path)
        text = ""
        for i, page in enumerate(reader.pages):
            text += f"--- Page {i+1} ---\n"
            text += page.extract_text() + "\n"
        with open(txt_path, "w", encoding="utf-8") as f:
            f.write(text)
        print("Successfully extracted using pypdf after installation")
        return True
    except Exception as e:
        print(f"Error after install: {e}")
        return False

if __name__ == "__main__":
    extract_pdf_text(
        r"c:\Users\naufa\BestariNusa\Bestari_Nusa_Client_Brief_Terisi_Sesuai_PDF_dan_Struktur_Web.pdf",
        r"c:\Users\naufa\BestariNusa\scratch\pdf_content.txt"
    )
