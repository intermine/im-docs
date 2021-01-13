# RST

orphan

:

::: {.index} rst, restructured text :::

## Syntax

::: {.seealso} [http://www.sphinx-doc.org/en/stable/rest.html](http://www.sphinx-doc.org/en/stable/rest.html), [http://thomas-cokelaer.info/tutorials/sphinx/rest\_syntax.html](http://thomas-cokelaer.info/tutorials/sphinx/rest_syntax.html), [http://packages.python.org/an\_example\_pypi\_project/sphinx.html](http://packages.python.org/an_example_pypi_project/sphinx.html) :::

### Enumerated lists

1. This is the first item
2. This is the second item
3. Enumerators are arabic numbers, single letters, or roman numerals
4. List items should be sequentially numbered, but need not start at 1

   \(although not all formatters will honour the first index\).

5. This item is auto-enumerated

#### Level 3 titles

Referring to a page in the docs with custom link text `Talk to us please! </about/contact-us>`{.interpreted-text role="doc"}

Otherwise it will use the name of the document by default `/about/contact-us`{.interpreted-text role="doc"}

\| A line block with [some](http://) syntax too. \| preserving line breaks and spaces where needed

**Level 4 titles**

_emphasis_ **strong** `literal` [link](http://)

**Level 5 titles**

... are discouraged as they look smaller than paragraphs

![image](http://docutils.sourceforge.net/docs/user/rst/images/ball1.gif)

### Figures

Look nicer than plain inserted images as they have a bounding box. **They do not work well with left or right align.**

![Someone ate a cookie, kitten sad\...](http://zckimg.com/squidoo/lolcat/eated-cookie-lolcat.jpg){.align-center}

### Versions

To specify below the title of a page when a new feature was added, use:

```text
.. versionadded:: 1.1
```

### Tables

A B

Led Cepin music Hugh Laurie television

Simple table:

+-------------+--------+ \| Inputs \| Output \| +=============+========+ \| &gt; A B \| A or B \| +-------------+--------+ \| ===== ===== \| ====== \| +-------------+--------+ \| False False \| False \| +-------------+--------+ \| True False \| True \| +-------------+--------+ \| False True \| True \| +-------------+--------+ \| True True \| True \| +-------------+--------+

### Definition lists

what

: Definition lists associate a term with a definition.

how

: The term is a one-line phrase, and the definition is one or more paragraphs or body elements, indented relative to the term. Blank lines are not allowed between term and definition.

### Footnotes

Footnotes provide extra information where using an info box is not appropriate

### Source Code

This is a normal text paragraph. The next paragraph is a code sample

```text
/* Type here */

Widget = {
    hide: function() {
        return this.element
            .animate({opacity: 0.0, top: -10});
    },
    show: function() {
        return this.element
            .animate({opacity: 1.0, top: 0});
    },
    element: $(".widget")
}
```

This is a normal text paragraph again followed by some CoffeeScript.

```text
# Type here 
Scope::find = (name, options) ->
    return true if @check(name, options)
    @add name, "var"
    false
```

### Note

::: {.note} ::: {.title} Note :::

Refer to mine with as MINE\_NAME :::

### Warning

::: {.warning} ::: {.title} Warning :::

All bash code blocks should start with $ :::

### Index page

The index page \(link top right\) is generated automatically using the keywords set on each page:

```text
.. index:: keyword, another keyword
```

### Troubleshooting

**Entire document not appearing?** Lines beginning with whitespace are invalid and can cause this error. Comb through your document and check things like headings to make sure they\'re manually trimmed.

```text
This would be a bad heading because it starts with a space
===========================================================
```

### ASCII Art...

```text
.,,.
,;;*;;;;,
.-'``;-');;.
/'  .-.  /*;;
.'    \d    \;;               .;;;,
/ o      `    \;    ,__.     ,;*;;;*;,
\__, _.__,'   \_.-') __)--.;;;;;*;;;;,
`""`;;;\       /-')_) __)  `\' ';;;;;;
;*;;;        -') `)_)  |\ |  ;;;;*;
;;;;|        `---`    O | | ;;*;;;
*;*;\|                 O  / ;;;;;*
;;;;;/|    .-------\      / ;*;;;;;
;;;*;/ \    |        '.   (`. ;;;*;;;
;;;;;'. ;   |          )   \ | ;;;;;;
,;*;;;;\/   |.        /   /` | ';;;*;
;;;;;;/    |/       /   /__/   ';;;
'*jgs/     |       /    |      ;*;
 `""""`        `""""`     ;'
```

```text
whole page say.
```
