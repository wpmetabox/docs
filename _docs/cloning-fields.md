---
title: Cloning fields
---

The clone feature of the Meta Box plugin allows us to create multiple inputs from a text, textarea, select, ... fields without declaring many fields in the code.

## Making a field cloneable

To make a field cloneable, just add `'clone' => true` to field's parameter. After doing that, you'll see a new **+** (Add Clone) button below field input:

![add clone](https://i.imgur.com/V1ApsEs.png)

Clicking on that button will duplicate field input:

![duplicate input](https://i.imgur.com/XwKi6yi.png)

You can notice that there are new buttons **-** (Remove Clone) which allow you to remove clones.

## Clone settings

Name|Description
---|---
`clone`|Make field cloneable? `true` or `false` (default). Optional.
`max_clone`|Limit the number of clones. Integer. Must be greater than 2. Optional.
`add_button`|The text for **Add more** clone button. Optional. Default "+ Add more".
`clone_default`|Clone the default value of fields? `true` or `false` (default).
`sort_clone`|Allow to drag-and-drop sort clones. `true` or `false` (default). See the following screenshot.
`clone_as_multiple`| Whether to store cloned values in multiple rows in the database? [See this post](https://metabox.io/introducing-clone-as-multiple-feature/) for examples.

![drag and drop](https://i.imgur.com/RJBgw6m.png)
