
# conver color scheme of vim


import re
import json
import yaml

kolor_files = [
    "/home/za/.vim/colors/abyss.vim",
    "/home/za/.vim/colors/autumnleaf.vim",
    "/home/za/.vim/colors/eclipse.vim",
    "/home/za/.vim/colors/ekinivim.vim",
    "/home/za/.vim/colors/neverland2-darker.vim",
    "/home/za/.vim/colors/neverland2.vim",
    "/home/za/.vim/colors/neverland-darker.vim",
    "/home/za/.vim/colors/neverland.vim",
    "/home/za/.vim/colors/nu42dark.vim",
    "/home/za/.vim/colors/summerfruit256.vim",
    "/home/za/.vim/colors/warez.vim",
]


# hi! DiffText                     guifg=#191919   guibg=#42799D   gui=NONE
pat1  = r'\s*hi\S+\s+(\S+)\s+(gui[fb]g=\S+)\s+(gui[fb]g=\S+).*'
rpat1 = re.compile(pat1, re.I | re.MULTILINE)

pat2  = r'highlight\s+(\S+)\s+.*(gui[fb]g=\S+)\s+.*(gui[fb]g=\S+).*'
rpat2 = re.compile(pat2, re.I | re.MULTILINE)


pat  = r'hi!\s+(\S+)\s+gui[fb]g=(#[0-9a-f])\s+gui[fb]g=(#[0-9a-f]).*'
rpat = re.compile(pat, re.I | re.MULTILINE)

regui = re.compile('gui', re.I | re.M)

#kolord = {}

def read_vim_color_file(file_path=kolor_files[-1], pat=rpat1):
    """parse it to css styles """

    colors = {}
    with open(file_path, 'r') as f:
        text = f.read()
        fa = pat.findall(text)

        print(type( fa))
        for one in fa:

            colors[one[0]] = (one[1], one[2])
            pass

        return colors


def testRead(file_path=kolor_files[2], pat=rpat1):
    """parse it to css styles """

    colors = {}
    with open(file_path, 'r') as f:
        text = f.read()
        print(text[:300])
        fa = pat.findall(text)

        print(type( fa))
        print(fa)
        for one in fa:

            colors[one[0]] = (one[1], one[2])
            pass

        print(colors)
        return colors

ce = 'guifg=#9E5c2e'
tp = r'guifg=(\S+)'



def find_pat(pat, string):
    rpat = re.compile(pat, re.I)
    return rpat.search(string)


def kolor_parse(ccss, vstr):
    """ ccss is a css {color: #xxx, ...}, vstr is vim :hi color set.

    hi! DiffText guifg=#191919 guibg=#42799D gui=NONE
    this results to:
        color: #191919
        background-color: #42799D
    """



    #if vstr.find('guifg')
    if find_pat('guifg', vstr):

        property_name = 'color'
        pat = re.compile(r'guifg=(\S+)', re.I)

        #print ('parse guifg:')
        return general_parse(ccss, property_name, pat, vstr)


    #if vstr.find('guibg'):
    if find_pat('guibg', vstr):
        property_name = 'background-color'
        pat = re.compile(r'guibg=(\S+)', re.I)

        #print ('parse guiBg:')
        return general_parse(ccss, property_name, pat, vstr)

    print('you get nothing parsed')


def fg_parse(vimstr):

    css = {
        'color' : 'inherit'
        }

    pat = re.compile(r'guifg=(\S+)', re.I)
    m = pat.match(vimstr)
    if not m:
        raise 'no match'

    print(m)

    gs = m.groups()
    code = None

    if len(gs) > 0:
        code = gs[0]
        pass

    print(code)

    css['color'] = code

    none_color_pat = re.compile(r'none', re.I)
    if none_color_pat.match(code):
        css['color'] = 'inherit'

    return css, m


def general_parse(css, property_name, pat, vim_color_set):

    #css[property_name] = 'inherit'

    m = pat.match(vim_color_set)
    if not m:
        raise 'no match'

    #print(m)

    gs = m.groups()
    code = None

    if len(gs) > 0:
        code = gs[0]
        pass

    #print(code)

    css[property_name] = code

    if find_pat('none', code):
        print('found none: ', vim_color_set)
        css[property_name] = 'inherit'

    #none_color_pat = re.compile(r'none', re.I)
    #if none_color_pat.match(code):
    #    css[property_name] = 'inherit'

    return css






def translate_vim_color(pat, filename, output, file_format='json'):
    styles = {}

    kolors = read_vim_color_file(filename, pat)
    for (k,v) in kolors.items():
        #print('k,v: ', k,v)

        cs = {}
        cs['color'] = 'inherit'
        cs['background-color'] = 'inherit'

        for fgbg in v:
            kolor_parse(cs, fgbg);
            pass

        #print(cs)
        styles[k] = cs
        pass

    if file_format == 'json':
        dump_json(styles, output)

    if file_format == 'yaml':
        dump_yaml(styles, output)

    #with open(output, 'w') as out:
    #    out.write(json.dumps(styles, indent=indent))

    return styles


def dump_json(data, output_file):
    with open(output_file, 'w') as out:
        out.write(json.dumps(data, indent=4))

def dump_yaml(data, output_file):
    with open(output_file, 'w') as out:
        out.write(yaml.dump(data, indent=4, default_flow_style=False))


property_name = 'color'
pat = re.compile(r'guifg=(\S+)', re.I)
css = {
        'color' : 'inherit',
        'background-color' : 'inherit'
}


#general_parse(css, property_name, pat, esample[0])
#styles = translate_vim_color(rpat1, kolor_files[-1], 'warez.json')

k2 = kolor_files[2]

if __name__ == '__main__':
    k2 = kolor_files[2]
    #styles = translate_vim_color(rpat2, k2, 'color.eclipse.json')
    translate_vim_color(rpat2, k2, 'color.eclipse.yaml', 'yaml')


    #kolors = read_vim_color_file()

    #esample = kolors['Exception']
    #nsample = kolors['Normal']

    #testRead(file_path=kolor_files[2], pat=rpat2)
    pass
