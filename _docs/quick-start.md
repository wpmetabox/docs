---
title: Quick start
---

After [installing Meta Box](/installation/), you won't see anything in the WordPress admin area. The plugin doesn't have any admin page for configuration or settings. Instead of that, it provides an API that you can use to speed up the process of creating meta boxes and custom fields.

## Getting started with online generator

The fastest way to getting started with Meta Box is use our [online generator](https://metabox.io/online-generator/) to generate meta boxes with custom fields. The online generator provides a powerful and friendly UI for you to create meta boxes and custom fields just by drag and drop fields.

![online generator](https://i.imgur.com/shvWYj4.png)

Please follow the steps below:

- Go to [Online Generator](https://metabox.io/online-generator/)
- Fill in all the info of meta boxes and custom fields
- Click button **Generate Code** to get the code
- Copy the code and paste into your theme's `functions.php` file (or into your plugin's file)

Now go to **Posts &rarr; Add New** to see the result.

## Creating a simple meta box manually

If you don't use the online generator, you can create meta boxes and custom fields with a little PHP coding.

The code below registers a simple meta box with 4 fields: name, gender, email and biography. Just copy and paste it into your theme's `functions.php` file.

```php
add_filter( 'rwmb_meta_boxes', 'prefix_meta_boxes' );
function prefix_meta_boxes( $meta_boxes ) {
    $meta_boxes[] = array(
        'title'  => 'Test Meta Box',
        'fields' => array(
            array(
                'id'   => 'name',
                'name' => 'Name',
                'type' => 'text',
            ),
            array(
                'id'      => 'gender',
                'name'    => 'Gender',
                'type'    => 'radio',
                'options' => array(
                    'm' => 'Male',
                    'f' => 'Female',
                ),
            ),
            array(
                'id'   => 'email',
                'name' => 'Email',
                'type' => 'email',
            ),
            array(
                'id'   => 'bio',
                'name' => 'Biography',
                'type' => 'textarea',
            ),
        ),
    );
    return $meta_boxes;
}
```

Then go to **Posts → Add New**, you will see a new meta box appears below the post editor:

![meta box](https://i.imgur.com/NLlFkFM.png)

{% include alert.html content="Each meta box and field has settings to customize how they look and how they function. To learn more about that, please read [meta box](/creating-meta-boxes/) and [field settings](/field-settings/) guides." %}

Now, it's time to add data to the custom fields! All fields are very intuitive to use and display seamlessly with the WordPress admin style. They will appear and function just like the post title and post content. Simply enter your content and update the post!

## Understand the basics

As you see in the both methods above, you need to copy some code and paste into your `functions.php` file. This is because Meta Box doesn't have any UI in the admin for you to create and manage custom meta boxes and custom fields. Instead of that, it provides you a very powerful API to quickly add custom fields to the editing pages. It might take you a little time at first, but then you will love the way it work because it helps you do and customize things very easily than any drag-and-drop plugins.

But, if you prefer UI to create and manage custom meta boxes and custom fields or you don't want to touch code, you can just use our [Online Generator](https://metabox.io/online-generator/) or use one of the premium extensions below:

- [MB Custom Post Type](https://metabox.io/plugins/custom-post-type/): Create and manage custom post types and custom taxonomies with nice UI
- [Meta Box Builder](https://metabox.io/plugins/meta-box-builder/): Create and manage custom meta boxes and custom fields with drag and drop UI. It's similar to [Online Generator](https://metabox.io/online-generator/), but integrated right in the WordPress admin area. So you don't need to copy and paste any more.

## More built-in demos

The Meta Box plugin has a [code snippet library](https://github.com/wpmetabox/library/) which you can use as a starting point for your projects. The library is constantly updated with the new features or new demos in every new release of the plugin.

Firstly, you should start with the `main `demo.php` file` by downloading it [here](https://github.com/wpmetabox/library/blob/master/general/demo.php). It is basic and has all explanations in comments (please read them carefully to understand how to write the script correctly).

Here are steps to integrate the `demo.php` into your theme:

- Copy `demo.php`(https://github.com/wpmetabox/library/blob/master/general/demo.php) file to your theme folder
- Open `functions.php` file of your theme and add the following code: `include 'demo.php';`

Now go to **Add New Post** page and see the result. If everything is ok, you'll see as the following screenshots:

![demo](https://i.imgur.com/7JbfV3D.png)

## Displaying fields

Displaying field values is very easy with the helper function `rwmb_meta`. It takes the field ID and returns the field value:

```php
$value = rwmb_meta( 'name' );
echo $value;
```

To learn more about the helper function, please see [this documentation](/displaying-fields/).

## Next steps

This guide covered all the basics for getting started with the Meta Box plugin, but it's just the first step. The real magic happens when you start using the plugin to create more complex meta boxes and taking advantage of all the awesome features, including the [premium extensions](https://metabox.io/plugins/).

To customize fields and meta boxes, please look at list of the documentation on the left menu. Note that the documentation is regularly updated to cover the latest features of the plugin, so keep checking it when you have any troubles using the plugin.

If you have any questions that we haven't covered in this guide, please [file an issue](https://github.com/wpmetabox/docs/issues/new) on Github. Happy developing!

## Related tutorials

[What is Meta Box plugin? How to use it to add custom fields in WordPress?](https://metabox.io/what-is-meta-box-plugin/)
