from ebooklib import epub
import colorama
from colorama import Back, Fore
import pickle

colorama.init()

def write(file_name, title, author, chapters):
    # Ebook
    book = epub.EpubBook()

    # set metadata
    book.set_identifier('id123456')
    book.set_title(title)
    book.set_language('en')
    book.add_author(author)
    book.add_author('Anonymous', file_as='Anonymous', role='ill', uid='coauthor')

    toc =  []
    spine = ['nav']
    # For each chapter add chapter to the book, TOC and spine
    for chapter in chapters:
        book.add_item(chapter)
        toc.append(epub.Link(chapter.file_name, chapter.title, chapter.title))
        spine.append(chapter)
    
    # define Table Of Contents
    book.toc = tuple(toc)

    # add default NCX and Nav file
    book.add_item(epub.EpubNcx())
    book.add_item(epub.EpubNav())

    # define CSS style
    style = 'pre{white-space:pre-wrap;background:#f7f9fa;padding:10px 15px;color:#263238;line-height:1.6;font-size:13px;border-radius:3px margin-top: 0;margin-bottom:1em;overflow:auto}b,strong{font-weight:bolder}#title{font-size:16px;color:#212121;font-weight:600;margin-bottom:10px}hr{height:10px;border:0;box-shadow:0 10px 10px -10px #8c8b8b inset}'
    nav_css = epub.EpubItem(uid="style_nav", file_name="style/nav.css", media_type="text/css", content=style)

    # add CSS file
    book.add_item(nav_css)

    # basic spine
    book.spine = spine

    # write to the file
    epub.write_epub(file_name, book, {})

    print(Back.GREEN + Fore.BLACK + " File " + Back.YELLOW + f" {file_name} "  + Back.GREEN + " Successfully Written ")
def main():
    # Load chapters list that stores chapter info
    # Store chapter info
    with open('chapters.pickle', 'rb') as f:
        chapters = pickle.load(f)


    write("Leetcode Questions.epub", "Leetcode Questions", "Anonymous", chapters)


if __name__ == "__main__":
    main()