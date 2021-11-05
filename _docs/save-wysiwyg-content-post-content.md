---
title: Save WYSIWYG content as post content
---

Sometimes you want to move the traditional editor for the post to another location, probably inside a meta box. It will keep everything more organized. For example, if you have an event post type, then you might have the following data:

- Start date and time
- End date and time
- Venue
- Description
- Gallery

Then keeping the description (which can be the post content) along with other fields make users easier to fill in the data. While this is impossible to do that with the default WordPress editor, we can do that with the [Meta Box](https://metabox.io) plugin. The steps to do that are describe below:

1. Remove the default editor (we don't want to display it at the top)
1. [Create a new wysiwyg field](/fields/wysiwyg/)
1. Set that field take the post content as the value
1. Save that field content into post content

The code is quite straight forward as below:

```php
// Remove the editor. Change 'post' to your custom post type.
add_action( 'init', function () {
    remove_post_type_support( 'post', 'editor' );
} );

add_filter( 'rwmb_meta_boxes', function ( $meta_boxes ) {
    // Get the current post content and set as the default value for the wysiwyg field.
    $post_id = filter_input( INPUT_GET, 'post', FILTER_SANITIZE_NUMBER_INT );
    $post_content = get_post_field( 'post_content', $post_id );

    $meta_boxes[] = [
        'title'      => 'Test',
        'post_types' => 'post', // Change 'post' to your custom post type.
        'fields'     => [
            // Register a wysiwyg field of which the content is saved as post content.
            [
                'type' => 'wysiwyg',
                'id'   => 'content', // This is a must!
                'name' => 'Fake content',
                'std'  => $post_content,
                'save_field' => false, // This is a must!
            ],
            // Custom style to overwrite the editor style set by WordPress.
            [
                'type' => 'custom_html',
                'std'  => '<style>#wp-content-editor-tools{background:none;padding-top:0;}</style>',
            ],
        ],
    ];

    return $meta_boxes;
} );

// Set the value for the 'content' field.
add_filter( 'rwmb_content_field_meta', function() {
    $post_id = filter_input( INPUT_GET, 'post', FILTER_SANITIZE_NUMBER_INT );
    return get_post_field( 'post_content', $post_id );
} );
```

There are 2 important things in the code above:

1. To make Meta Box save the wysiwyg content to post content, we have to set it `'id' => 'content'`. This `id` is used to tell WordPress to get the submitted value and save it to post content.
1. Because we use the WordPress's id for the field, some WordPress style is applied and makes the field look weird. We have to use a `custom_html` field to output some CSS to fix it. Note that you might want to enqueue another stylesheet to do the same job. Here we use the `custom_html` for the quick fix, it just works.

The code above works for `post`. If you want to make it work for another post type, don't forget to change the post type in the code above!
