---
title: MB Favorite Posts
---

## Overview

**MB Favorite Posts** is a WordPress plugin that helps you create the “Favorite Post” button easily. Users can click the button to **bookmark posts as favorites**, and then review them on a Dashboard page. You can enable this feature for **both guests and logged-in users**.

![The Favorite button on the front end of a WordPress website](https://i.imgur.com/JIiikVW.png)

**Note**: MB Favorite Posts plugin is only available for the [Lifetime Bundle](https://metabox.io/pricing/).

For more information, please see the [solution page](https://metabox.io/plugins/mb-favorite-posts/).

## Installation

First, you need to install and activate the Meta Box plugin from [wordpress.org](https://wordpress.org/plugins/meta-box/). Next, download MB Favorite Posts plugin from the [My Account](https://metabox.io/my-account/) page, then upload the <code>.zip</code> file from the **Admin Dashboard**. MB Favorite Posts and [other solutions](https://metabox.io/product-category/solutions/) are not included in Meta Box AIO, so you can install them independently without Meta Box AIO.

Upon finishing, the Favorite Posts Button will be automatically added to your WordPress website with the default settings:

![MB Favorite Posts plugin automatically add the button to your WordPress website](https://i.imgur.com/y5MAFRk.png)

To configure the Favorite Posts button to fit your needs, move to the next step.

## Settings

Go to **Settings** > **Favorite Posts**. You will see the UI with sections as follows:

![Go to the settings page of MB Favorite Posts plugin](https://i.imgur.com/CwacJMk.png)

### Enable for non-logged in users

When you enable this feature, users don’t have to log in to add the post to their favorite list.

![Enable the Favorite Posts feature for non-logged in users](https://i.imgur.com/SzBkWZL.png)

If you don’t enable this feature, the following message will show up when users click the favorite post button:

![The message that shows up when users click the favorite post button](https://i.imgur.com/3U8quMe.png)

### Button Text and Button Added Text

In these two sections, you can enter the button labels. For example, I set the button labels as follows:

![Change the Button Text and Button Added Text](https://i.imgur.com/bWebSSZ.png)

This is how the Favorite Posts button displays on the front end:
![Favorite Posts button](https://i.imgur.com/kPiUUb1.gif)

### Position

In this section, you can choose to display the button in the following places:

- Before Content
- After Content
- Both

![Choose the position to display the button](https://i.imgur.com/4I3Kpxn.png)

This is how the button display on the front end:

![The button display on the front end of the WordPress website](https://i.imgur.com/cIVh7pm.png)

### Post Types

In this section, choose the post type you want to display the Favorite Posts button.

![Choose the post type you want to display the Favorite Posts button](https://i.imgur.com/EpEIgih.png)

You can also **disable the Favorite Posts button** by unticking all post types in this section.

### Dashboard Page and Register Page

MB Favorite Posts are integrated with [MB User Profile](https://metabox.io/plugins/mb-user-profile/) to help users create the Dashboard page and the Register page automatically without coding.

The Dashboard page shows all the favorite posts of a user, and the Register page contains a form that users can sign up for accounts to use the Favorite Posts feature.

**Note**: when a user signs up for an account on the Register Page, his user role will be **Subscriber**.

You can choose available pages on the website and change them to the Dashboard page and the Register page.

![Change available pages on the website to the Dashboard page and the Register page](https://i.imgur.com/UMR7SsL.png)

For example, I choose these pages:

![Change two pages to the Dashboard page and the Register page](https://i.imgur.com/6e5wOLu.png)

Better yet, you should create brand new pages for this purpose. To do so, go to **Pages** > **Add New**, fill in the name for the page and click **Publish**.

![Create brand new pages on the WordPress website](https://i.imgur.com/6lDi2YI.png)

The Register page and the Dashboard page will be displayed on the front end as follows:

![The Register page shows up on the WordPress website](https://i.imgur.com/uwH64JE.png)

![The Dashboard page shows up on the WordPress website](https://i.imgur.com/4uDV7P1.png)

To delete a post from the favorite list, just click the icon on the right of the post name:

![Delete a post from the favorite list.](https://i.imgur.com/KxbKTyf.png)

## Shortcodes

The plugin provides 3 shortcodes:
You can put them anywhere on the website (sidebar, page content, etc.).

- `[mbfp-posts]`: to show the list of favorite objects

- `[mbfp-button]`: to show the "Add to favorite" button

```php
[mbfp-button id="custom_id" class="custom_class" add="add_text" added="added_text" show_count=1]
```
It accepts the following parameters:
Name|Description
---|---
`id`|Custom ID name. Optional. If missed, the shortcode will get the current object ID.
`class`|Custom class name. Optional.
`add`|Custom text if object wasn't add to favorite. Optional. If missed, the shortcode will get from mb-favorite-post plugin settings.
`added`|Custom text if object was added to favorite. Optional. If missed, the shortcode will get from mb-favorite-post plugin settings.
`show_count`|Set show total number favorite or not. Optional. Default 0


- `[mbfp-count]`: to show the total number favorite of a object
```php
[mbfp-button id="custom_id" ]
```
It accepts the following parameters:
Name|Description
---|---
`id`|Custom ID name. Optional. If missed, the shortcode will get the current object ID.
