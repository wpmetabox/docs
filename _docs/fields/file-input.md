---
title: File Input
---

## Overview

The file input field creates a simple text input for uploading a single file. You are able to select a file from the Media Library or enter file URL directly (even URL for a file hosted on another website).

## Screenshot

![file input](https://i.imgur.com/cPVTMNy.png)

## Settings

This field doesn't have any specific settings. It only uses [common field settings](/field-settings/).

## Data

This field saves file URL in the database.

## Template usage

To get field value (file URL), use the following code:

```php
$value = rwmb_meta( $field_id );
echo $value;
```

If you want to show the file as an image, use the following code:

```php
$value = rwmb_meta( $field_id );
echo '<img src="', $value, '">';
```

Read more about [rwmb_meta()](/rwmb-meta/).
