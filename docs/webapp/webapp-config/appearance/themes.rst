Themes
================================

Changing themes
----------------

InterMine provides a set of default themes but you can also create your own. All themes are defined in ''intermine/webapp/main/resources/webapp/themes/ ''

Current themes provided with InterMine are listed below. Screenshots of each theme are provided in the ''themes/'' directory.

 * ''blue''
 * ''bright_blue''
 * ''brown''
 * ''ecoli_blue''
 * ''gold''
 * ''green''
 * ''grey''
 * ''metabolic''
 * ''modmine''
 * ''purple''
 * ''ratmine''

To switch themes you have to edit the web.properties file in your mine's webapp directory (''YOUR_MINE/webapp/resources/web.properties'').

{{{
# web.properties
theme = purple
}}}

You need to change this property to the name of the theme you want to use (the directory name), then re-release the webapp.  Be sure to run {{{ant-clean}}} to ensure that all of the old files are deleted.

{{{
# in YOUR_MINE/webapp/resources/webapp
ant clean
ant default remove-webapp release-webapp
}}}


Developing your own theme
--------------------------------

With CSS knowledge and open source image software such as [http://www.gimp.org GIMP] or [http://www.inkscape.org INKSCAPE] it is very easy to develop your own theme. Each theme directory contains a theme.css file, which is broken down in annotated sections, and image files. The image files are required for displaying menus, headers and backgrounds and can be modified with image software to match your colour scheme. Simply create a new directory under ''intermine/webapp/main/resources/webapp/themes/ '', copy the contents of another theme directory into it and start editing.

 * ''corner_act_t_l.png''
 * ''corner_act_t_r.png''
 * ''corner_my_t_l.png''
 * ''corner_my_t_r.png''
 * ''corner_t_l.png''
 * ''corner_t_r.png''
 * ''grad_box.png''
 * ''gray_grad.png''
 * ''heading-bg.gif''
 * ''submenu_indent.png''
 * ''submenu_my.png''
 * ''table-heading-bg.gif''
 * ''theme.css''
 * ''top_gradient.png''
 * ''xml.png''
 
 
Changing the logo
--------------------------------
 
The logo is independent from the themes, and is located in ''YOUR_MINE/webapp/resources/webapp/model/images/logo.png''. To change the logo, simply change this file to your own. The recommended size is w45px by h43px.
