---
title: Getting Started
permalink: /getting-started/
---

## Install

To install Meta Box plugin, please go to **Plugins &rarr; Add New** and search for **Meta Box**. Then click the button **Install** to install it. After that, click the button **Activate** to activate the plugin.

[![install](http://i.imgur.com/1YmG3EE.png)](http://i.imgur.com/1YmG3EE.png)

## Getting Started With Online Generator

The fastest way to getting started with Meta Box is use our [online generator](https://metabox.io/online-generator/) to generate meta box with custom fields. The online generator provides a powerful and friendly UI for you to create meta boxes and custom fields just by drag and drop fields.

[![online generator](https://i.imgur.com/r6ITYZi.png)](https://i.imgur.com/r6ITYZi.png)

Please follow the steps below:

- Go to [Online Generator](https://metabox.io/online-generator/) page
- Fill in all the info of meta boxes and custom fields
- Click button **Generate Code** to get the code
- Copy that code and pasted into your theme's `functions.php` file (or into your plugin's file)

Now go to **Posts &rarr; Add New** and see the result.

## Creating A Simple Meta Box Manually

If you prefer working with the code manually, please just open your theme's `functions.php` file (or a PHP file of your plugin) and insert the following code:

```php
add_filter( 'rwmb_meta_boxes', 'prefix_meta_boxes' );
function prefix_meta_boxes( $meta_boxes ) {
    $meta_boxes[] = array(
        'title'      => __( 'Test Meta Box', 'textdomain' ),
        'post_types' => 'post',
        'fields'     => array(
            array(
                'id'   => 'name',
                'name' => __( 'Name', 'textdomain' ),
                'type' => 'text',
            ),
            array(
                'id'      => 'gender',
                'name'    => __( 'Gender', 'textdomain' ),
                'type'    => 'radio',
                'options' => array(
                    'm' => __( 'Male', 'textdomain' ),
                    'f' => __( 'Female', 'textdomain' ),
                ),
            ),
            array(
                'id'   => 'email',
                'name' => __( 'Email', 'textdomain' ),
                'type' => 'email',
            ),
            array(
                'id'   => 'bio',
                'name' => __( 'Biography', 'textdomain' ),
                'type' => 'textarea',
            ),
        ),
    );
    return $meta_boxes;
}
```

Then go to **Posts &rarr; Add New**, you will see a new meta box appears below the post editor:

![meta box](http://i.imgur.com/NLlFkFM.png)

## Understand The Basics

As you see in the both methods above, you need to copy some code and paste into your `functions.php` file. This is because Meta Box doesn't have any UI in the admin for you to create and manage custom meta boxes and custom fields. Instead of that, it provides you a *very* powerful API to quickly add custom fields to the editing pages. It might take you a little time at first, but then you will love the way it work because it helps you do and customize things very easily than any drag-and-drop plugins.

But, if you prefer UI to create and manage custom meta boxes and custom fields or you don't want to touch code, you can just use our [Online Generator](https://metabox.io/online-generator/) or use one of the premium extensions below:

- [MB Custom Post Type](https://metabox.io/plugins/custom-post-type/): Create and manage custom post types and custom taxonomies with nice UI
- [Meta Box Builder](https://metabox.io/plugins/meta-box-builder/): Create and manage custom meta boxes and custom fields with drag and drop UI. It's similar to [Online Generator](https://metabox.io/online-generator/), but integrated right in the WordPress admin area. So you don't need to copy and paste any more.

## More Built-in Demos

The Meta Box plugin has a [list of demos](https://github.com/wpmetabox/meta-box/tree/master/demo) which you can use as a starting point for your projects. The list is constantly updated with the new features or new demos in every new release of the plugin.

Firstly, you should **start with `demo.php`** by downloading it [here](https://github.com/wpmetabox/meta-box/blob/master/demo/demo.php). It is basic and **has all explanations in comments** (please read them *carefully* to understand how to write the script correctly).

Here are steps to integrate the `demo.php` into your theme:

- Copy [`demo.php`](https://github.com/wpmetabox/meta-box/blob/master/demo/demo.php) file to your theme folder
- Open `functions.php` file of your theme and add the following code: `include 'demo.php';`

Now go to **Add New Post** page and see the result. If everything is ok, you'll see as the following screenshots:

![demo](http://i.imgur.com/7JbfV3D.png)

## Going Further

To customize fields and meta boxes, please look at the documentation on the left menu. Note that the documentation is regularly updated to cover the latest features of the plugin, so keep checking it when you have any troubles using the plugin.