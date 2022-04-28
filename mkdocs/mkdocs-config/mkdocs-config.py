# Source for the code
# https://github.com/mkdocs/mkdocs/issues/545#issuecomment-366845721

from markdown.extensions import Extension
from markdown.blockprocessors import (
    ListIndentProcessor, OListProcessor, UListProcessor)


class ShortIndentListExtension(Extension):
    def extendMarkdown(self, md, md_globals):
        original_tab_length = md.parser.markdown.tab_length
        md.parser.markdown.tab_length = 2

        try:
            md.parser.blockprocessors['indent'] = ListIndentProcessor(md.parser)
            md.parser.blockprocessors['olist'] = OListProcessor(md.parser)
            md.parser.blockprocessors['ulist'] = UListProcessor(md.parser)
        finally:
            md.parser.markdown.tab_length = original_tab_length


def makeExtension(*args, **kwargs):
    return ShortIndentListExtension(*args, **kwargs)