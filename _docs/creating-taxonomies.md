---
title: Creating a taxonomy
---

A taxonomy within WordPress is a way of grouping posts together. By default, a standard post will have two taxonomy types called Categories and Tags which are a handy way of ensuring related content on your website is easy for visitors to find. You can add more custom taxonomies if you like.

Creating a custom post type is done by either of the following methods:

- **Using MB Custom Post Types & Custom Taxonomies**. This extension is already bundled in Meta Box AIO/MB Core, or you can install it for free from [WordPress.org](https://wordpress.org/plugins/mb-custom-post-type/).
- **Using our Taxonomy Generator**.
- **Using code** with the `register_taxonomy()` function.

This documentation shows you how to create taxonomies with **MB Custom Post Types & Custom Taxonomies** extension, as it's the best way. To use the Taxonomy Generator, please follow [this guide](/taxonomy-generator/). To use the `register_taxonomy()`, please see [WordPress documentation](https://developer.wordpress.org/reference/functions/register_taxonomy/).

Here is a video tutorial on creating custom post types and custom taxonomies with MB Custom Post Types & Custom Taxonomies extension (text version below):

<iframe width="560" height="315" src="https://www.youtube.com/embed/-oYrHGOri4w" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

To create a new custom taxonomy, go to **Meta Box &rarr; Taxonomies** and click **Add New**:

![create taxonomies](https://i.imgur.com/yy7wy9w.png)

The settings are divided into 4 tabs:

- **General**: the taxonomy names and slug
- **Labels**: all labels for the taxonomy
- **Advanced**: advanced settings for the taxonomy such as public, menu settings, hierarchy, etc.
- **Post types**: the post types that connect to the taxonomy

After done, click the **Publish** button to register the taxonomy. Or click the **Get PHP Code** button to get the PHP code that you can insert into your theme's `functions.php` file (or your plugin's file). After inserting, you can deactivate the extension to make your site a little bit faster.

## General settings

![create taxonomies](https://i.imgur.com/yy7wy9w.png)

Name | Description
---|---
Plural name | General name for the taxonomy, usually plural. Required.
Singular name | Name for one object of this taxonomy. Required.
Slug | Taxonomy key, must not exceed 32 characters and may only contain lowercase alphanumeric characters, dashes, and underscores.

When entering a singular name for the taxonomy, the slug is automatically generated. You can manually change the slug if necessary.

## Label settings

Labels are automatically generated from the taxonomy's plural and singular names.

![taxonomy label settings](https://i.imgur.com/LtuXkrh.png)

Name | Description
---|---
Search items | Label for searching items. Default 'Search Tags'/'Search Categories'.
Popular items | Label for most popular items, only used for non-hierarchical taxonomies. Default 'Popular Tags'.
All items | Label to signify all items in a submenu link. Default 'All Tags'/'All Categories'.
Parent item | Label for parent item, only used for hierarchical taxonomies. Default 'Parent Category'.
Parent item colon | The same as parent item, but with colon : in the end.
Edit item | Label for adding a new singular item. Default 'Edit Tag'/'Edit Category'.
View item | Label for viewing a singular item. Default 'View Tag'/'View Category'.
Update item | Label for updating a singular item. Default 'Update Tag'/'Update Category'.
Add new item | Label for adding a new singular item. Default 'Add New Tag'/'Add New Category'.
New item name | Label for new item name. Default 'New Tag Name'/'New Category Name'.
Separate items with commas | This label is only used for non-hierarchical taxonomies. Default 'Separate tags with commas', used in the meta box.
Add or remove items | This label is only used for non-hierarchical taxonomies. Default 'Add or remove tags', used in the meta box when JavaScript is disabled.
Choose from most used | This label is only used on non-hierarchical taxonomies. Default 'Choose from the most used tags', used in the meta box.
Not found | Label used in the meta box and taxonomy list table. Default 'No tags found'/'No categories found'.
No terms | Label used in the posts and media list tables. Default 'No tags'/'No categories'.
Filter by | This label is only used for hierarchical taxonomies, used in the posts list table. Default 'Filter by category'.
Table pagination hidden heading | Label for the table pagination hidden heading.
Table hidden heading | Label for the table hidden heading.
Most used tab | Title for the Most Used tab. Default 'Most Used'.
Back to items | Label displayed after a term has been updated.
Menu name | Label for the tab in the admin menu.

## Advanced settings

![ taxonomy advanced settings](https://i.imgur.com/dOCcR5d.png)

Name | Description
---|---
Description | A short descriptive summary of what the taxonomy is for.
Public | Whether a taxonomy is intended for use publicly either via the admin interface or by front-end users.
Public queryable| Whether the taxonomy is publicly queryable. If not set, the default is inherited from the public settings.
Hierarchical | Whether the taxonomy is hierarchical. Default false.
Show UI | Whether to generate and allow a UI for managing terms in this taxonomy in the admin. If not set, the default is inherited from the public settings (default true).
Show in menu | Whether to show the taxonomy in the admin menu. If true, the taxonomy is shown as a submenu of the object type menu. If false, no menu is shown. The show UI settings must be true. If not set, default is inherited from the show UI settings.
Show in nav menus | Makes this taxonomy available for selection in navigation menus. If not set, the default is inherited from the public settings.
Show on edit page | Whether to show the taxonomy meta box on the edit page.
Show in REST | Whether to include the taxonomy in the REST API. Set this to true for the taxonomy to be available in the block editor.
REST API base slug | To change the base URL of REST API route. Default is the taxonomy slug.
Show tag cloud | Whether to list the taxonomy in the Tag Cloud Widget controls. Default is inherited from the show UI settings.
Show in quick edit | Whether to show the taxonomy in the quick/bulk edit panel. Default is inherited from the show UI settings.
Show admin column | Whether to display a column for the taxonomy on its post type listing screens. Default false.
Custom rewrite slug | Customize the permastruct slug. Default is the taxonomy slug.
Prepended permalink structure | Should the permastruct be prepended. Default true. Example: if your permalink structure is `/blog/`, then your links will be: false -> `/news/`, true -> `/blog/news/`.
Hierarchical URL | Either hierarchical rewrite tag or not. Default false.
Query var | Sets the query var key (taxonomy slug) for this taxonomy.
Sort | Whether terms in this taxonomy should be sorted.

## Post types settings

This is the list of post types that are connected with the taxonomy. Simply select the post types you want to connect to the taxonomy.

![post types settings](https://i.imgur.com/MQCmchM.png)
