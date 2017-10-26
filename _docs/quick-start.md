---
title: Quick start
---

After [installing Meta Box](/installation/), you won't see anything in the WordPress admin area. The plugin doesn't have any admin page for configuration or settings. Instead of that, it provides an API that you can use to speed up the process of creating meta boxes and custom fields.

It's great if you know a little PHP coding. But if you don't, you still can use our tool to make it work.

## Creating a meta box

### Using the online generator

The fastest way to create a new meta box is use the online generator. It provides a friendly drag-and-drop UI to create meta boxes and custom fields.

![online generator](https://i.imgur.com/shvWYj4.png)

To use the online generator:

- Go to [Online Generator](https://metabox.io/online-generator/)
- Fill in all the info of meta boxes and custom fields
- Click button **Generate Code** to get the code
- Copy the code and paste into your theme's `functions.php` file (or into your plugin's file)

Now go to **Posts &rarr; Add New** to see the result.

### Using PHP code

If you don't use the online generator, you can create meta boxes and custom fields with a little PHP coding.

The code below registers a simple meta box with 4 fields: name, gender, email and biography.

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

Copy and paste it into your theme's `functions.php` file.

{% include alert.html content="Each meta box and field has settings to customize how they look and how they function. To learn more about that, please read [meta box](/creating-meta-boxes/) and [fields](/fields/) guides." %}

## Creating content

With the meta box created, it's time to start editing your content! All our fields are very intuitive to use and display seamlessly with the WordPress admin style. They will appear and function just like the post title and post content. Simply enter your content and update the post!

![meta box](https://i.imgur.com/NLlFkFM.png)

## Displaying fields

Displaying field values is very easy with the helper function `rwmb_meta`. It takes the field ID and returns the field value:

```php
$value = rwmb_meta( 'name' );
echo $value;
```

To learn more about the helper function, please see [this documentation](/displaying-fields/).

## More UI

If you prefer UI to create and manage custom meta boxes and custom fields or you don't want to touch code, you can just use our online generator or use one of the premium extensions below:

- [MB Custom Post Type](https://metabox.io/plugins/custom-post-type/): Create and manage custom post types and custom taxonomies with nice UI
- [Meta Box Builder](https://metabox.io/plugins/meta-box-builder/): Create and manage custom meta boxes and custom fields with drag and drop UI. It's similar to the online generator, but integrated right in the WordPress admin area. So you don't need to copy and paste any more.

## Code examples

In order to help our users to spend less time writing code for meta boxes and fields, we have created a [list of examples](https://github.com/wpmetabox/library/) which you can use as a starting point for your projects.

You should start with the [main `demo.php` file](https://github.com/wpmetabox/library/blob/master/general/demo.php). It has all explanations for meta box settings and field settings in the comments.

## Next steps

This guide covered all the basics for getting started with the Meta Box plugin, but it's just the first step. The real magic happens when you start using the plugin to create more complex meta boxes and taking advantage of all the awesome features, including the [premium extensions](https://metabox.io/plugins/).

If you have any questions that we haven't covered in this guide, please [file an issue](https://github.com/wpmetabox/docs/issues/new) on Github. Happy developing!