
# Web Development Final Project - *The Scriptorium*

Submitted by: **Tatiana Vela**

This web app: **a forum for wizards and other magic users**

Time spent: **36** hours spent in total

## Required Features

The following **required** functionality is completed:

- [x] **Web app includes a create form that allows the user to create posts**
  - Form requires users to add a post title
  - Forms should have the *option* for users to add: 
    - additional textual content
    - an image added as an external image URL
- [x] **Web app includes a home feed displaying previously created posts**
  - Web app must include home feed displaying previously created posts
  - By default, each post on the posts feed should show only the post's:
    - creation time
    - title 
    - upvotes count
  - Clicking on a post should direct the user to a new page for the selected post
- [x] **Users can view posts in different ways**
  - Users can sort posts by either:
    -  creation time
    -  upvotes count
  - Users can search for posts by title
- [x] **Users can interact with each post in different ways**
  - The app includes a separate post page for each created post when clicked, where any additional information is shown, including:
    - content
    - image
    - comments
  - Users can leave comments underneath a post on the post page
  - Each post includes an upvote button on the post page. 
    - Each click increases the post's upvotes count by one
    - Users can upvote any post any number of times

- [x] **A post that a user previously created can be edited or deleted from its post pages**
  - After a user creates a new post, they can go back and edit the post
  - A previously created post can be deleted from its post page

The following **optional** features are implemented:
- [x] Web app implements pseudo-authentication
  - ~~Users can only edit and delete posts or delete comments by entering the secret key, which is set by the user during post creation~~
  - ~~**or** upon launching the web app, the user is assigned a random user ID. It will be associated with all posts and comments that they make and displayed on them~~
  - For both options, only the original user author of a post can update or delete it
   - Users can register for an account or post anonymously. Anonymous posts cannot be edited, but registered users can edit their posts.
- [ ] Users can repost a previous post by referencing its post ID. On the post page of the new post
  - Users can repost a previous post by referencing its post ID
  - On the post page of the new post, the referenced post is displayed and linked, creating a thread
- [ ] Users can customize the interface
  - e.g., selecting the color scheme or showing the content and image of each post on the home feed
- [ ] Users can add more characteristics to their posts
  - Users can share and view web videos
  - Users can set flags such as "Question" or "Opinion" while creating a post
  - Users can filter posts by flags on the home feed
  - Users can upload images directly from their local machine as an image file
- [ ] Web app displays a loading animation whenever data is being fetched

The following **additional** features are implemented:

* [x] User sign in. Allows users to have a display name
* [x] Comments also have users and timestamps
* [x] Partial implementation of user profiles. Did not have time to make them editable.

## Video Walkthrough

Here's a walkthrough of implemented features:

feed
<img src='/walkthroughs/feed.gif' title='Video Walkthrough' width='' alt='Video Walkthrough' />

signin
<img src='/walkthroughs/signin.gif' title='Video Walkthrough' width='' alt='Video Walkthrough' />

CRUD operations
<img src='/walkthroughs/crud.gif' title='Video Walkthrough' width='' alt='Video Walkthrough' />

post interaction
<img src='/walkthroughs/post_interaction.gif' title='Video Walkthrough' width='' alt='Video Walkthrough' />

GIFs created with  [ScreenToGif](https://www.screentogif.com/) for Windows
