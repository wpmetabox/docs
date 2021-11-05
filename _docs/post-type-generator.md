---
title: Post Type Generator
---

[Post Type Generator](https://metabox.io/post-type-generator/) is a free online tool to help you create and set up custom post types easily with a simple and intuitive user interface. With this tool, you can copy and paste PHP code for custom post types in a few clicks.

One notable feature of this tool is that it can be used independently from Meta Box core plugin. Therefore, you don’t need to install the Meta Box core plugin to use Post Type Generator.


## Set up a New Custom Post Type

### Set up General Options

After opening this tool [here](https://metabox.io/post-type-generator/), fill in the basic information for your new custom post type like **Plural name, Singular name** and **Slug** in the **General** tab. The **Function name** and **Text domain** already have default values, but you can change them as well.

![Set up General information of your custom post type created with Meta Box Post Type Generator tool](https://i.imgur.com/WZsxlhE.png)

### Set up Labels

The **Labels** tab lets you enter the labels of your post types that will show up in the Admin Dashboard.

![Set up labels of your custom post type created with Meta Box Post Type Generator tool](https://i.imgur.com/C3PtAc3.png)

### Set up Advanced Options

In the **Advanced** tab, the description of each field will help you set up some advanced options for your post types display.

![Set up advance information of your custom post type created with Meta Box Post Type Generator tool](https://i.imgur.com/JcmKDgq.png)

Pay attention to some fields:

- **Publicly queryable?** If you tick the box, it can query to take the data of your post type so that the content of it can be displayed on the front end.
- Similarly, put a tick to the **Show UI?** and **Show in nav menus?** if you want to show your post type UI and show your post type in nav menus in the Dashboard. It’s recommended to enable them for easy management.
- **Hierarchical?** If you want your post type to have a parent post type and sub post type in order to sort and manage it conveniently, enable this.

For more details about all the fields in this tab, please read [this instruction](https://developer.wordpress.org/reference/functions/register_post_type/) from WordPress.

### Set up Supports and Taxonomies

In the **Supports** tabs, you can choose which elements to display in the WordPress Editor when editing your custom post types.

![Set up the supported components of your custom post type created with Meta Box Post Type Generator tool](https://i.imgur.com/qRslf7w.png)

In the **Taxonomies** tab, the two default WordPress taxonomies are listed here. Choose which kind of taxonomy to be included in your post type.

![Set up taxonomies of your custom post type created with Meta Box Post Type Generator tool](https://i.imgur.com/S5sBSfa.png )

## Generate Code and Insert It to the Functions.php File

When you complete all the steps above, click the **Generate Code** button. Just wait a moment and the code will show up right under the button.

![Meta Box Post Type Generator tool generates code to create your custom post type ](https://i.imgur.com/RIrSc7I.png)

Copy the code and insert it to the `functions.php` file and it's all done.
