---
title: Video
---

## Overview

The video field uses WordPress media popup for selecting / uploading videos.

## Screenshot

![video](https://i.imgur.com/M84bDrX.png)

## Settings

Besides the [common settings](/field-settings/), this field has the following specific settings:

Name | Description
--- | ---
`max_file_uploads` | Max number of uploaded videos. Optional.
`force_delete` | Whether or not delete the videos from Media Library when deleting them from post meta (`true` or `false`)? Optional. Default `false`.
`max_status` | Display how many videos uploaded/remaining. Applied only when `max_file_uploads` is defined. `true` (default) or `false`. Optional.

## Sample code

```php
array(
    'name'             => 'Video',
    'id'               => 'field_id',
    'type'             => 'video',

    // Maximum video uploads. 0 = unlimited.
    'max_file_uploads' => 3,

    // Delete videos from Media Library when remove it from post meta?
    // Note: it might affect other posts if you use same videos for multiple posts
    'force_delete'     => false,

    // Display the "Uploaded 1/3 videos" status
    'max_status'       => true,
),
```

## Data

Similar to file field, this field saves multiple values (video attachment IDs) in the database. Each value (video attachment ID) is stored in a single row in the database with the same meta key (similar to what `add_post_meta` does with last parameter `false`).

## Template usage

To get the uploaded videos, use the helper function [rwmb_meta()](/rwmb-meta/):

```php
$videos = rwmb_meta( 'field_id' );
foreach ( $videos as $video ) {
    ?>
    <video src="<?php echo $video['src']; ?>">
    <?php
}
```

This helper function returns an array of videos, each video has the following information:

```php
array(
    'ID'          => 123,
    'src'         => 'https://example.com/wp-content/uploads/intro.mp4',
    'title'       => 'Introduction',
    'type'        => 'video',
    'caption'     => 'Video caption',
    'description' => 'Video description',

    // Array of video ID3 meta. See https://developer.wordpress.org/reference/functions/wp_get_attachment_id3_keys/
    'meta'        => array(),

    // Video dimension.
    'dimensions'  => array(
        'width'  => 640,
        'height' => 360,
    ),

    // Featured image: full size
    'image'       => array(
        'src'    => https://example.com/wp-content/uploads/full.jpg',
        'width'  => 1024,
        'height' => 500',
    ),

    // Featured image: thumbnail
    'thumb'       => array(
        'src'    => https://example.com/wp-content/uploads/full-150x150.jpg',
        'width'  => 150,
        'height' => 150',
    ),
);
```

In case you want to get only 1 video, use the `limit` parameter for the helper function:

```php
$videos = rwmb_meta( 'field_id', array( 'limit' => 1 ) );
$video = reset( $videos );
?>
<video src="<?php echo $video['src']; ?>">
```

If you only want to display uploaded videos in a player (with playlist), you can just use the [rwmb_the_value()](/rwmb-the-value/):

```php
rwmb_the_value( $field_id );
```

If you want to output the video player for each single uploaded video, then you can use this code:

```php
$videos = rwmb_meta( 'field_id' );
foreach ( $videos as $video ) {
    echo wp_video_shortcode( array(
        'src'    => $video['src'],
        'width'  => $video['dimensions']['width'],
        'height' => $video['dimensions']['height'],
    ) );
}
```

Read more about [rwmb_meta()](/rwmb-meta/), [rwmb_the_value()](/rwmb-the-value/) and [wp_video_shortcode()](https://codex.wordpress.org/Function_Reference/wp_video_shortcode).
