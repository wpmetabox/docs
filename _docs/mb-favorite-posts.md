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

![plugin settings](https://i.imgur.com/xLgurGV.png)

Here you can change the style for the button. We create 3 predefined styles for you to choose from:

- Default: which has a form of a button
- Like: a simple like icon (similar to Facebook like button)
- Rounded: a rounded button with an icon only

You can customize the style for all elements of the button, such as text, text color, icon, etc.

There are also options to let you specify where and when the button is displayed.

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

`[mbfp-posts]`: to show the list of favorite objects

`[mbfp-button]`: to show the "Add to favorite" button

```php
[mbfp-button id="post_id" class="custom_class" add="add_text" added="added_text" show_count="true"]
```
It accepts the following parameters:

Name|Description
---|---
`id`|The ID of the post. Optional. If missed, the shortcode will get the current object ID.
`class`|Custom class name. Optional.
`add`|Custom button text when the post isn't added to favorites. Optional. If missed, the shortcode will get the value from the plugin settings.
`added`|Custom button text when the post is added to favorites. Optional. If missed, the shortcode will get the value from the plugin settings.
`font_size`|Size of text. Optional. Default 14px.
`show_count`|Show the total favorites of a post. Optional. Default false.
`show_icon`|Show icon in button. Optional. Default false.
`icon`|Custom icon. You can choose one of these [ heart, star, pin, like, award ]. Optional. Default heart icon.
`icon_only`|Show icon only. Optional. Default false.
`icon_size`|Size of icon. Optional. Default 16px.


`[mbfp-count]`: to show the total number favorite of a object
```php
[mbfp-count id="post_id" ]
```
It accepts the following parameters:

Name|Description
---|---
`id`|The ID of the post. Optional. If missed, the shortcode will get the current object ID.

## Data

The data of favorites is stored in 2 places:

- User meta: the plugin stores array (serialized) of favorite post IDs in the user meta with key `mbfp_posts`. If you enable for non-logged in users, then the array of favorite post IDs is stored in the cookie.
- Post meta: the plugin also stores array (serialized) of user IDs, who added a post to their favorites, in the post meta with key `mbfp_count`. This post meta is used to count how many favorites a post has.

So if you want to query favorite posts of an user, you can do the following:

```php
$post_ids = get_user_meta( $user_id, 'mbfp_posts', true );
$query = new WP_Query( [
    'post_type' => 'post',
    'post__in'  => $post_ids,
] );
// Do something with $query.
```

You can also query which users favorite a post:

```php
$user_ids = get_post_meta( $post_id, 'mbfp_count', true );
$users = get_users( [
    'include' => $user_ids,
] );
// Do something with $users.
```
