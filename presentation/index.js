// Import React
import React from "react";

// Import Spectacle Core tags
import {
  Appear,
  BlockQuote,
  Cite,
  CodePane,
  Deck,
  Fill,
  Heading,
  Image,
  Layout,
  Link,
  ListItem,
  List,
  Markdown,
  Quote,
  Slide,
  Spectacle,
  Text
} from "spectacle";

// Import image preloader util
import preloader from "spectacle/lib/utils/preloader";

// Import theme
import createTheme from "../assets/theme";

// Require CSS
require("normalize.css");
require("spectacle/lib/themes/default/index.css");


const images = {
  flush: require("../assets/flush.png")
};

preloader(images);

const theme = createTheme({
  primary: "#ffffff"
});

export default class Presentation extends React.Component {
  render() {
    return (
      <Spectacle theme={theme}>
        <Deck transition={["fade"]} transitionDuration={500}>
          <Slide bgColor="primary">
            <Image width="100%" src={images.flush}/>
          </Slide>
          <Slide bgColor="primary" notes="and through a little bit of trickery makes the ExponentialList element the child of the TopLevelWrapper element. Now that it has this root of the element tree, it can start instantiating elements.">
            <Image width="100%" src={images.vdom12}/>
          </Slide>
          <Slide bgColor="primary" notes="This means creating another tree which is pretty similar to the element tree, but actually has state.">
            <Image width="100%" src={images.vdom13}/>
          </Slide>
          <Slide bgColor="primary" notes="So it kicks off the mounting process. At the end of the mounting process, it will have all of the DOM nodes it needs to show the user the webpage. To kick off the process, it creates an instance for the TopLevelWrapper and then it starts going through this recurrsive process">
            <Image width="100%" src={images.vdom14}/>
          </Slide>
          <Slide bgColor="primary" notes="First it gets to creating the ExponentialList instance. It sets the props and the state on the instance. Then it realizes that it doesn't know what gets shown for an ExponentialList... if it were a div or something like that, something standard, it would know what to do. But since it doesn't know, it asks the ExponentialList component. And the way it asks is by calling render.">
            <Image width="100%" src={images.vdom15}/>
          </Slide>
          <Slide bgColor="primary" notes="So ExponentialList component tells React to create a button element, and an Item element for each item in this.state.items.">
            <Image width="100%" src={images.vdom17}/>
          </Slide>
          <Slide bgColor="primary" notes="React creates these elements all at once... it doesn't care about the fact that it doesn't know what Item renders to.">
            <Image width="100%" src={images.vdom18}/>
          </Slide>
          <Slide bgColor="primary" notes="It starts to instantiate the div. Since that's a native component, one of it's internal components, it knows exactly what kind of DOM interaction it needs to do to create it. So it does that.">
            <Image width="100%" src={images.vdom19}/>
          </Slide>
          <Slide bgColor="primary" notes="It crosses over to the DOM and creates a div. Note that it didn't make the div a child of the app container yet. That would have caused a reflow.">
            <Image width="100%" src={images.vdom20}/>
          </Slide>
          <Slide bgColor="primary" notes="Now it needs to instantiate the children. It will go through the div's list of children and flatten it, and give each child a name called a key... this will be important later. Then it will go through and call mountComponent for all of the children.">
            <Image width="100%" src={images.vdom21}/>
          </Slide>
          <Slide bgColor="primary" notes="That's easy with the button. Once again, it's a native component. React knows exactly what kind of DOM interaction it needs to do for a button.">
            <Image width="100%" src={images.vdom22}/>
          </Slide>
          <Slide bgColor="primary" notes="When it gets to the first Item, it needs to go through that render process again. It doesn't know what Item means in DOM interactions, so it has to ask the component by calling render.">
            <Image width="100%" src={images.vdom23}/>
          </Slide>
          <Slide bgColor="primary" notes="The item answers that React should create a div with the text from the prop.">
            <Image width="100%" src={images.vdom24}/>
          </Slide>
          <Slide bgColor="primary" notes="So React creates the element">
            <Image width="100%" src={images.vdom25}/>
          </Slide>
          <Slide bgColor="primary" notes="and the instance for it">
            <Image width="100%" src={images.vdom26}/>
          </Slide>
          <Slide bgColor="primary" notes="and because div is a component it understands, it creates the mount image too">
            <Image width="100%" src={images.vdom27}/>
          </Slide>
         <Slide bgColor="primary" notes="and it does this two more times to create the full DOM that needs to be inserted">
            <Image width="100%" src={images.vdom28}/>
          </Slide>
         <Slide bgColor="primary" notes="then it goes over to the DOM and wires the children up to the parent. It builds a full mount image out of the mount images of the children">
            <Image width="100%" src={images.vdom29}/>
          </Slide>
          <Slide bgColor="primary" notes="And then it mounts the image into the node, which means it hooks up the div to the container div.">
            <Image width="100%" src={images.vdom30}/>
          </Slide>
          <Slide bgColor="primary" notes="This is when you get the reflow. So that's the initial render. That's what happens when you call React.render() in your webpage. We have the element tree which is constructed, and that provides some hints about what instance should be constructed, or how the instance should be changed. And then that instance is used to figure out how the DOM should change.">
            <Image width="100%" src={images.vdom31}/>
          </Slide>
          <Slide bgColor="primary" notes="So now let's take a look at what happens when you do change the DOM... when you actually update the DOM because the user has clicked on something.">
            <Image width="100%" src={images.vdom32}/>
          </Slide>




          <Slide bgColor="primary" notes="The user clicks the button. This runs the handler. This handler says something like this.">
            <Image width="100%" src={images.vdom32}/>
          </Slide>
          <Slide bgColor="primary" notes="It computes the new values and calls this.setState() to set them....">
            <Image width="100%" src={images.vdom32}/>
          </Slide>
          <Slide bgColor="primary" notes="Well the this that it refers to is is the instance... the ExponentialList instance. We bound the function to the ExponentialList so that that whenever this is clicked, it's calling setState() on the instance. So what happens when setState is called?">
            <Image width="100%" src={images.vdom32}/>
          </Slide>
          <Slide bgColor="primary" notes="React doesn't immediately handle the state change. Instead, it adds the state to the instance's pendingStateQueue. Then it adds the instance to what's called the dirty components array. It will go on to handle any other setState() calls triggered by this and add those to the dirty component array too. This gives it a chance to batch updates, which can help with the reflow problem.">
            <Image width="100%" src={images.vdom32}/>
          </Slide>
          <Slide bgColor="primary" notes="After it has taken care of all the changes that were possibly triggered, it comes back to this queue and flushes it. One by one, it starts this process using the instance as the root.">
            <Image width="100%" src={images.vdom32}/>
          </Slide>
        </Deck>
      </Spectacle>
    );
  }
}
