import fitz
import docx

async def parse_cv(cv_file):
    contents = await cv_file.read()
    if cv_file.filename.endswith('.pdf'):
        with fitz.open(stream=contents, filetype='pdf') as doc:
            text = "\n".join(page.get_text() for page in doc)
    elif cv_file.filename.endswith('.docx'):
        docx_file = docx.Document(cv_file.file)
        text = "\n".join(p.text for p in docx_file.paragraphs)
    else:
        text = contents.decode("utf-8")
    return text
