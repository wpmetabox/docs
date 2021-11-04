---
title: Creating a post type
---

WordPress houses lots of different types of content and they are divided into something called **post types﻿**. Whilst there are already some built-in post types within WordPress (such as post, page, or attachment), you may want to create custom post types if you want to break things down into smaller categories. For example, if you want to have a section on Books or Events, it would be better suited to creating a custom post type for them.

Creating a custom post type is done by either of the following methods:

- **Using MB Custom Post Types & Custom Taxonomies**. This extension is already bundled in Meta Box AIO/MB Core, or you can install it for free from [WordPress.org](https://wordpress.org/plugins/mb-custom-post-type/).
- **Using our Post Type Generator**.
- **Using code** with the `register_post_type()` function.

This documentation shows you how to create post types with **MB Custom Post Types & Custom Taxonomies** extension, as it's the best way. To use the Post Type Generator, please follow [this guide](/post-type-generator/). To use the `register_post_type()`, please see [WordPress documentation](https://developer.wordpress.org/reference/functions/register_post_type/).

Here is a video tutorial on creating custom post types and custom taxonomies with MB Custom Post Types & Custom Taxonomies extension (text version below):

<iframe width="560" height="315" src="https://www.youtube.com/embed/-oYrHGOri4w" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

To create a new custom post type, go to **Meta Box &rarr; Post Types** and click **Add New**:

![creating a post type](https://i.imgur.com/GhMqEU4.png)

The settings are divided into 5 tabs (explained in details below):

- **General**: the post type names and slug
- **Labels**: all labels for the post type
- **Advanced**: advanced settings for the post types, including menu position, menu icon, REST API support, rewrite rules, etc.
- **Supports**: the features that the post type supports
- **Taxonomies**: the taxonomies that connect to the post type

After done, click the **Publish** button to register the post type. Or click the **Get PHP Code** button to get the PHP code that you can insert into your theme's `functions.php` file (or your plugin's file). After inserting, you can deactivate the extension to make your site a little bit faster.

## General settings

![creating a post type](https://i.imgur.com/GhMqEU4.png)

Name | Description
---|---
Plural name | General name for the post type, usually plural. Required.
Singular name | Name for one object of this post type. Required.
Slug | Post type key. Must not exceed 20 characters and may only contain lowercase alphanumeric characters, dashes, and underscores.

When entering a singular name for the post type, the slug is automatically generated. You can manually change the slug if necessary.

## Label settings

Labels are automatically generated from the post type's plural and singular names.

![label settings](https://i.imgur.com/h3pXR2Y.png)

Name | Description
---|---
Add new | Label for adding a new singular item. Default is 'Add New' for both hierarchical and non-hierarchical types.
Add new item | Label for adding a new singular item. Default is 'Add New Post' / 'Add New Page'.
Edit item | Label for editing a singular item. Default is 'Edit Post' / 'Edit Page'.
New item | Label for the new item page title. Default is 'New Post' / 'New Page'.
View item | Label for viewing a singular item. Default is 'View Post' / 'View Page'.
View items | Label for viewing post type archives. Default is 'View Posts' / 'View Pages'.
Search items | Label for searching items. Default is 'Search Posts' / 'Search Pages'.
Not found | Label used when no items are found. Default is 'No posts found' / 'No pages found'.
Not found in trash | Label used when no items are in the Trash. Default is 'No posts found in Trash' / 'No pages found in Trash'.
Parent items | Label used to prefix parents of hierarchical items. Not used on non-hierarchical post types. Default is 'Parent Page:'.
All items | Label to signify all items in a submenu link. Default is 'All Posts' / 'All Pages'.
Nav menu archives | Label for archives in nav menus. Default is 'Post Archives' / 'Page Archives'.
Attributes meta box | Label for the attributes meta box. Default is 'Post Attributes' / 'Page Attributes'.
Media frame button | Label for the media frame button. Default is 'Insert into post' / 'Insert into page'.
Media frame filter | Label for the media frame filter. Default is 'Uploaded to this post' / 'Uploaded to this page'.
Featured image meta box | Label for the featured image meta box title. Default is 'Featured image'.
Setting the featured image | Label for setting the featured image. Default is 'Set featured image'.
Removing the featured image | Label for removing the featured image. Default is 'Remove featured image'.
Used as featured image | Label in the media frame for using a featured image. Default is 'Use as featured image'.
Menu name | Label for the menu name. Default is the same as plural name.
Table filter hidden heading | Label for the table views hidden heading. Default is 'Filter posts list' / 'Filter pages list'.
Table date filter hidden heading | Label for the date filter in list tables. Default is 'Filter by date'.
Table pagination hidden heading | Label for the table pagination hidden heading. Default is 'Posts list navigation' / 'Pages list navigation'.
Table hidden heading | Label for the table hidden heading. Default is 'Posts list' / 'Pages list'.
Item published | Label used when an item is published. Default is 'Post published.' / 'Page published.'
Item published privately | Label used when an item is published with private visibility. Default is 'Post published privately.' / 'Page published privately.'
Item switched to draft | Label used when an item is switched to a draft. Default is 'Post reverted to draft.' / 'Page reverted to draft.'
Item scheduled | Label used when an item is scheduled for publishing. Default is 'Post scheduled.' / 'Page scheduled.'
Item updated | Label used when an item is updated. Default is 'Post updated.' / 'Page updated.'

## Advanced settings

![advanced settings](https://i.imgur.com/AzdNBWH.png)

Name | Description
---|---
Description | A short descriptive summary of what the post type is.
Public | Whether a post type is intended for use publicly either via the admin interface or by front-end users. Default false.
Hierarchical | Whether the post type is hierarchical (e.g. page). Default false.
Exclude from search | Whether to exclude posts with this post type from front end search results. Default is the opposite value of the public settings.
Publicly queryable | Whether queries can be performed on the front end for the post type as part of `parse_request()`. Default is inherited from the public settings.
Show UI | Whether to generate and allow a UI for managing this post type in the admin. Default is the value of the public settings.
Show in menu | Where to show the post type in the admin menu.
Menu position after | The position in the menu order the post type should appear.
Menu icon | The URL to the icon to be used for this menu (Dashicons).
Show in nav menus | Makes this post type available for selection in navigation menus. Default is the value of the public settings.
Show in admin bar | Makes this post type available via the admin bar. Default is the value of show in menu settings.
Show in REST | Whether to include the post type in the REST API. Set this to true for the post type to be available in the block editor.
REST API base slug | Custom base URL of REST API route. Default is the post type slug.
Capability type | The string to use to build the read, edit, and delete capabilities. Default 'post'.
Has archive | Whether there should be post type archives. Will generate the proper rewrite rules if the rewrite settings is enabled. Default false.
Custom archive slug | The custom archive slug. Default is the post type slug.
Custom rewrite slug | Customize the permastruct slug. Default is the post type slug.
Prepended permalink structure | Whether the permastruct should be prepended. Example: if your permalink structure is `/blog/`, then your links will be: `false` -> `/news/`, `true` -> `/blog/news/`. Default true.
Query var | Sets the custom query var key for this post type. Default is the post type slug.
Can export | Whether to allow this post type to be exported. Default true.
Delete with user | Whether to delete posts of this type when deleting a user.

## Supports settings

These are core feature(s) the post type supports/has.

![supports settings](https://i.imgur.com/Fk9dp5w.png)

Name | Description
---|---
Title | Post title
Editor | Post editor (the main content)
Excerpt | Post excerpt
Author | Post author
Thumbnail | The featured image
Trackbacks | The trackbacks/pingbacks from other websites
Custom fields | The custom fields meta box in the edit screen
Comments | Enable comments for posts of this type
Revisions | Enable revisions for posts of this type
Page attributes | The attributes meta box to select post template and parent
Post formats | Enable post format for posts

## Taxonomies settings

This is the list of taxonomies that are registered for the post type. Simply select the taxonomies you want to use for the post type.

![taxonomies settings](https://i.imgur.com/aggYlsw.png)
