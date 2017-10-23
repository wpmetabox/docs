---
title: Repeating Fields
---

The repeating feature of the Meta Box plugin allows us to create multiple inputs from a text, textarea, select, ... fields without declaring many fields in the code.

To make a field cloneable, just add `'clone' => true` to field's parameter. After doing that, you'll see a new **+** (Add Clone) button below field input:

![add clone](http://i.imgur.com/V1ApsEs.png)

Clicking on that button will duplicate field input:

![duplicate input](http://i.imgur.com/XwKi6yi.png)

You can notice that there are new buttons **-** (Remove Clone) which allow you to remove clones.

**Since version 4.5.4**, there're 2 additional parameters which allow you to use clone feature better:

1. `max_clone`: limit the number of clones. Integer. Must be greater than 2. Optional.
1. `sort_clone`: allow users to drag-and-drop sort clones. Boolean, `true` to enable sorting, `false` to disable. Default is `false`. See the following screenshot.

![drag and drop](http://i.imgur.com/RJBgw6m.png)