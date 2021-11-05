---
title: Taxonomy Generator
---

[Taxonomy Generator](https://metabox.io/taxonomy-generator/) is a free online tool to create custom taxonomy easily and quickly. You can use it without installing Meta Box core plugin.

## Set up a New Custom Post Taxonomy

### Set up General Options

Open this tool [here](https://metabox.io/taxonomy-generator/) and put the **Plural Name, Singular Name** and **Slug** of your custom taxonomy in the **General** tab. The **Function name** and **Text domain** already have default values, but you can change them as well.

![Set up general information of your custom taxonomy created with Meta Box Taxonomy Generator tool](https://i.imgur.com/eJdGyjQ.png)

### Set up Labels

The **Labels** tab lets you enter the labels of your custom taxonomy that will show up in the Admin Dashboard.

![Set up labels of your custom taxonomy created with Meta Box Taxonomy Generator tool](https://i.imgur.com/uUKLw6w.png)

### Set up Advanced Options

In the **Advanced tab**, just read the description of each field. They will help you set up some advanced options for your custom taxonomy.

Remember that if you tick the box **Public?**, it can query to take the data of your custom taxonomy so that the content of it can be displayed on the front end.

![Set up advanced information of your custom taxonomy created with Meta Box Taxonomy Generator tool](https://i.imgur.com/LXB8eLN.png)

For more detail about all the fields in this tab, please read [this instruction](https://developer.wordpress.org/reference/functions/register_taxonomy/) from WordPress.

### Set up Post Types Tab

The Post Types tab lists the two default post types **Post** and **Page** here. Just decide whether your custom taxonomy will display in your posts or pages.

![In Taxonomy Generator, set up the post type where your custom taxonomy will display](https://i.imgur.com/gfBFDWz.png)

## Generate Code and Insert It to the Functions.php File

When you complete all steps above, click the **Generate Code** button. Just wait a moment and the code will show up right under the button.

![Meta Box Taxonomy Generator generates code](https://i.imgur.com/MudzzYG.png)

Copy the code and insert it to the `functions.php` file and it's all done.
