---
title: Using custom HTML to output anything
---

`custom_html` is a very useful field in Meta Box, which helps you to _output anything_ in the post edit screen. It can be a warning box or an instruction for users to help them enter the correct data. But do you know that **you can use PHP** to render the HTML for the field?

Using PHP, you can query the database, get WordPress information and show it. There's no limit with PHP. This guide helps you understand the field using a callback function to query the WordPress database and output the result. For the demo purpose: **I will setup a connection from a post to many pages (1 to many). And when editing a page, I need to know which posts refer to the current page**. So, creating a connection from a page to many posts is very simple with a field `post` like this:

```php
array(
    'id'        => 'page',
    'name'      => 'Page',
    'type'      => 'post',
    'post_type' => 'page',
    'multiple'  => true,
),
```

To get the list of posts refer to the current page, I will use a field `custom_html` like this:

```php
array(
    'id'       => 'posts',
    'type'     => 'custom_html',
    'callback' => 'prefix_get_connected_posts',
),
```

Note the `callback` parameter: this callback refers to a custom PHP function (in this case `prefix_get_connected_posts`) which renders the content for the field. Implementing this function is quite easy as below:

```php
function prefix_get_connected_posts() {
    if ( ! $page_id = filter_input( INPUT_GET, 'post',  FILTER_SANITIZE_NUMBER_INT ) ) {
        return '';
    }
    $output = '';
    $posts  = get_posts( [
        'posts_per_page' => - 1,
        'meta_key'       => 'page',
        'meta_value'     => $page_id,
    ] );
    foreach ( $posts as $post ) {
        $output .= '<li><a href="' . get_permalink( $post )  . '">' . get_the_title( $post ) . '</a></li>';
    }

    return $output ? '<ul>' . $output . '</ul>' : '';
}
```

Here is the full code:

```php
add_filter( 'rwmb_meta_boxes', function ( $meta_boxes ) {
    // Connect a post with multiple pages.
    $meta_boxes[] = [
        'title'  => 'Connection',
        'fields' => [
            [
                'id'        => 'page',
                'name'      => 'Page',
                'type'      => 'post',
                'post_type' => 'page',
                'multiple'  => true,
            ],
        ],
    ];

    // Show connected posts to a page
    $meta_boxes[] = [
        'title'      => 'Connected Posts',
        'post_types' => 'page',
        'fields'     => [
            [
                'id'       => 'posts',
                'type'     => 'custom_html',
                'callback' => 'prefix_get_connected_posts',
            ],
        ],
    ];

    return $meta_boxes;
} );

function prefix_get_connected_posts() {
    if ( ! $page_id = filter_input( INPUT_GET, 'post', FILTER_SANITIZE_NUMBER_INT ) ) {
        return '';
    }
    $output = '';
    $posts  = get_posts( [
        'posts_per_page' => - 1,
        'meta_key'       => 'page',
        'meta_value'     => $page_id,
    ] );
    foreach ( $posts as $post ) {
        $output .= '<li><a href="' . get_permalink( $post ) . '">' . get_the_title( $post ) . '</a></li>';
    }

    return $output ? '<ul>' . $output . '</ul>' : '';
}
```

And here is the result:

When editing a post:

![edit posts](//i.imgur.com/J81E2ZO.png)

When editing a page:

![edit page](//i.imgur.com/P6guXho.png)