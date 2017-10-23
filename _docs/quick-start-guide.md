---
title: Quick start guide
---

After [installing Meta Box](/installation/), you won't see anything in the WordPress admin area. That's because the plugin doesn't have any admin page for configuration or settings. It only provides the API that you can use to speedup the process of creating meta boxes and custom fields.

It might take you a little time at first, but then you'll love the way it work because it helps you customize almost everything. Besides, working directly with code, it's lightweight and very fast.

It's great if you know a little PHP coding. But if you don't, you still can use our tool to make it work for you.

## Online generator

The fastest way to getting started with Meta Box is use our online generator. It provides a friendly UI for you to create meta boxes and custom fields just by drag and drop fields.

![online generator](https://i.imgur.com/shvWYj4.png)

To use the online generator:

- Go to [Online Generator](https://metabox.io/online-generator/) page
- Fill in all the info of meta boxes and custom fields
- Click button **Generate Code** to get the code
- Copy that code and pasted into your theme's `functions.php` file (or into your plugin's file)

Now go to **Posts &rarr; Add New** and see the result.

## Creating a meta box

If you don't use the online generator, you can create meta boxes and custom fields with a little PHP coding.

The code below registers a simple meta box with 4 fields: name, gender, email and biography.

```php
add_filter( 'rwmb_meta_boxes', 'prefix_meta_boxes' );
function prefix_meta_boxes( $meta_boxes ) {
    $meta_boxes[] = array(
        'title'  => __( 'Test Meta Box', 'textdomain' ),
        'fields' => array(
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

Copy and paste it to your theme's `functions.php` file (or a PHP file of your plugin) and go to **Posts &rarr; Add New**, you'll see a new meta box appears below the post editor:

![meta box](https://i.imgur.com/NLlFkFM.png)

## More UI

If you prefer UI to create and manage custom meta boxes and custom fields or you don't want to touch code, you can just use our online generator or use one of the premium extensions below:

- [MB Custom Post Type](https://metabox.io/plugins/custom-post-type/): Create and manage custom post types and custom taxonomies with nice UI
- [Meta Box Builder](https://metabox.io/plugins/meta-box-builder/): Create and manage custom meta boxes and custom fields with drag and drop UI. It's similar to the online generator, but integrated right in the WordPress admin area. So you don't need to copy and paste any more.

## Built-in demos

The Meta Box plugin has a [list of demos](https://github.com/wpmetabox/meta-box/tree/master/demo) which you can use as a starting point for your projects. The list is constantly updated with the new features or new demos in every new release of the plugin.

You should start with `demo.php` by downloading it [here](https://github.com/wpmetabox/meta-box/blob/master/demo/demo.php) and put it in your theme folder. Then open the theme's `functions.php` file add the following code:

```php
include 'demo.php';
```

Now go to **Add New Post** page and you'll see a list of all field types.

Please note that this file has all explanations in comments, so please read them carefully to understand how to write the code.

## Going further

To customize fields and meta boxes, please look at the documentation on the left menu. Note that the documentation is regularly updated to cover the latest features of the plugin, so keep checking it when you have any troubles using the plugin.