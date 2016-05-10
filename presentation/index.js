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
          <Slide bgColor="primary" notes="">
            <Image width="100%" src={images.imageName}/>
          </Slide>
          <Slide bgColor="primary" notes="Hi, I'm Lin Clark and I make code cartoons">
            <Image width="100%" src={images.imageName}/>
          </Slide>
          <Slide bgColor="primary" notes="I also work on a browser, though not the one you might think I do. I'm working with a team at Mozilla to create a new experimental browser. The project is called Project Tofino.... And it's built with React, so if you want to hack on it you can.">
            <Image width="100%" src={images.imageName}/>
          </Slide>
          <Slide bgColor="primary" notes="today I'm going to be talking about performance in React. I should start by saying I'm not going to be telling you anything that you haven't already heard. I'm going to be talking about things like keys, and shouldComponentUpdate, and immutability. The reason I wanted to talk about them though...">
            <Image width="100%" src={images.imageName}/>
          </Slide>
          <Slide bgColor="primary" notes="is because I think a lot of times we have a fuzzy understanding of these things. There are so many new things coming in all the time, that it's hard to take the time to really bring these ideas into focus. Instead, we let the received knowledge stay kind of fuzzy. That makes it really hard...">
            <Image width="100%" src={images.imageName}/>
          </Slide>
          <Slide bgColor="primary" notes="when new concepts come in that build on those ideas... it makes it hard to bring those new ideas into focus. So we just follow the recommendations of people we assume are smarter than us. But I want us to understand the why behind these things. Why use shouldComponentUpdate... and when? Because sometimes it might not be the best solution.">
            <Image width="100%" src={images.imageName}/>
          </Slide>
          <Slide bgColor="primary" notes="So I want to bring these ideas into focus so you have a better idea of what the problems are and which recommendations fix which problems.">
            <Image width="100%" src={images.imageName}/>
          </Slide>
          <Slide bgColor="primary" notes="I'll start by brining the concept of performance into focus, and I should say that I'm talking about a very specific part of performance, render performance. There are other parts of the performance equasion, but I won't touch on those. In this talk, when I say performance, I mean the speed that you render the page for the user for the first time, and the speed with which you update the page when the user interacts with it.">
            <Image width="100%" src={images.imageName}/>
          </Slide>
          <Slide bgColor="primary" notes="You can kind of think of this like a project you're doing at work... like a web site.">
            <Image width="100%" src={images.imageName}/>
          </Slide>
          <Slide bgColor="primary" notes="The first, initial render is kind of like the launch of the site... and then every interaction is like a new feature release to the site.">
            <Image width="100%" src={images.imageName}/>
          </Slide>
          <Slide bgColor="primary" notes="To extend this metaphor, your code is kind of like the project lead. It's the one planning the project and telling folks what to do. Unfortunately, only one person is assigned to do the work on the project... and that's the main thread.">
            <Image width="100%" src={images.imageName}/>
          </Slide>
          <Slide bgColor="primary" notes="The main thread is kind of like a full stack developer... it takes care of all of these different things. It takes care of JavaScript, it takes care of doing things with the DOM, and it takes care of layout, figuring out what should go on the page and what the layout of those things.">
            <Image width="100%" src={images.imageName}/>
          </Slide>
          <Slide bgColor="primary" notes="so just as when you're working on a project in real life, if you want to deliver things quickly, you're going to need to limit the work that you're putting on this one worker bee that you have. You don't want to overload them. You need to reduce the amount of work. And that's really what performance is about, reducing the amount of work you need to do.">
            <Image width="100%" src={images.imageName}/>
          </Slide>
          <Slide bgColor="primary" notes="but before we know how to reduce the amount of work that the main thread is doing, we need to know more about the work that the main thread does.">
            <Image width="100%" src={images.imageName}/>
          </Slide>



          <Slide bgColor="primary" notes="As I mentioned before, the main thread is in charge of JavaScript, the DOM, and layout. You obviously know what JavaScript is, that's all of the functions your code is defining and calling..">
            <Image width="100%" src={images.imageName}/>
          </Slide>
          <Slide bgColor="primary" notes="The DOM is the way the functions tell the page what to do. Basically the DOM gives you a set of objects that you can move around and manipulate in order to get the browser to change the page. Let's say we want to change the way a div looks. So the JS code could ask the main thread to add a class to the DOM element, this div. Then the main thread would recompute the styles and layout for the page, and then tell another part of the browser that it needs to change the pixels on the page.">
            <Image width="100%" src={images.imageName}/>
          </Slide>
          <Slide bgColor="primary" notes="But the main thread doesn't do that recomputation every time the DOM changes. If it did, it would be spending most of it's time calculating what the browser should look like over and over again. Instead, what it tries to do is batch as many of these into the same group as possible. That makes its work more efficient.">
            <Image width="100%" src={images.imageName}/>
          </Slide>
          <Slide bgColor="primary" notes="So we want to reduce the amount of work that the main thread has to do. Two good ways are 1. don't have your JS code make changes to the DOM unless they are necessary, and 2. if the JS code does have to make changes, be considerate to the main thread and how it works and group the requests for changes. That way the main thread can batch them.">
            <Image width="100%" src={images.imageName}/>
          </Slide>
          <Slide bgColor="primary" notes="And this is something that React helps you do. Now I want to be clear... React isn't the only way to do this. It's not actually a necessary part of doing this. These ideas have been around since well before React. These are already an accepted part of web development practice. So you can get as good or better performance with vanilla JS as you can React. It's not that React is necessarily faster than vanilla.">
            <Image width="100%" src={images.imageName}/>
          </Slide>
          <Slide bgColor="primary" notes="The thing is, though, in order to get that performance, your code has to be smart. Your code needs to know how to direct the main thread pretty precisely to do these things.">
            <Image width="100%" src={images.imageName}/>
          </Slide>
          <Slide bgColor="primary" notes="To go back to the metaphor, your code, the project lead on this project, needs to be both a really really good product manager... it needs to know what you should ship, and it also needs to be a really really good tech lead, it needs to know the most efficient way to direct the main thread in shipping.">
            <Image width="100%" src={images.imageName}/>
          </Slide>
          <Slide bgColor="primary" notes="Of course, your code is only as smart as you make it. So it means that all of the developers on your team have to have a really solid grasp of all of these concepts, and also not make mistakes.">
            <Image width="100%" src={images.imageName}/>
          </Slide>
          <Slide bgColor="primary" notes="What React does for you is that it offloads that work. It's kind of like your code brings in a consultant to do the tech lead work, which frees up your code to just be a good product manager... to specifically focus on what needs to happen, not on how to make it happen, but on what the product should do, what the page should display.">
            <Image width="100%" src={images.imageName}/>
          </Slide>
          <Slide bgColor="primary" notes="This tech lead just happens to be a robot named React.">
            <Image width="100%" src={images.imageName}/>
          </Slide>
          <Slide bgColor="primary" notes="So let's take a look at how these two work together to direct the main thread in creating the initial render.">
            <Image width="100%" src={images.imageName}/>
          </Slide>
          <Slide bgColor="primary" notes="We'll start with the webpage that your team is going to be building... a button with a list. When you click the button, it will multiply the value by itself.">
            <Image width="100%" src={images.imageName}/>
          </Slide>


          <Slide bgColor="primary" notes="The starting point that your team is working from is this. The user has downloaded a page. That page has at least one element that is going to be the container for the content that you're creating">
            <Image width="100%" src={images.imageName}/>
          </Slide>
          <Slide bgColor="primary" notes="At this point, React has been loaded and so has your code, including components... which are basically deputy product managers in charge of specific parts of the product.">
            <Image width="100%" src={images.imageName}/>
          </Slide>
          <Slide bgColor="primary" notes="Your code asks React to create an element using some props, and tells React to work with the List component to do this. What's an element? it's just a JavaScript object, kind of like a post-it note that has the type and the props that React is going to use to create the instance?">
            <Image width="100%" src={images.imageName}/>
          </Slide>
          <Slide bgColor="primary" notes="What's the instance? It's an instance of the component. It's the thing that holds on to the state, the props, the refs.">
            <Image width="100%" src={images.imageName}/>
          </Slide>
          <Slide bgColor="primary" notes="So React creates an element. It makes a note on the element that it will be working with the List component for this element.">
            <Image width="100%" src={images.imageName}/>
          </Slide>
          <Slide bgColor="primary" notes="Then it gives the element to your code and your code tells React to start rendering that element into the container that's in the HTML">
            <Image width="100%" src={images.imageName}/>
          </Slide>
          <Slide bgColor="primary" notes="So this kicks off the creation of the render tree. React creates this thing called a TopLevelWrapper which is really just for its own organization. Then it makes TopLevelWrapper render to your top level component.">
            <Image width="100%" src={images.vdom12}/>
          </Slide>
          <Slide bgColor="primary" notes="Because this is the initial render, this is going to kick off the mounting process. At the end of the mounting process, it will have all of the DOM nodes it needs to show the user the webpage. To kick off the process, it creates an instance for the TopLevelWrapper and then it starts going through this recurrsive process">
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
          <Slide bgColor="primary" notes="After it has taken care of all the changes that were possibly triggered, it comes back to this queue and flushes it.">
            <Image width="100%" src={images.vdom32}/>
          </Slide>



          <Slide bgColor="primary" notes="We only have one component in the queue, so that is the only one we'll process. The component that had setState() called is treated as the root of a subtree, so we start processing from there.">
            <Image width="100%" src={images.vdom32}/>
          </Slide>
          <Slide bgColor="primary" notes="React calculates what the next context, props, and state would be. Then it sets these on the instance.">
            <Image width="100%" src={images.vdom32}/>
          </Slide>
          <Slide bgColor="primary" notes="It grabs a copy of the element that ExponentialList rendered to last time. Then it creates a new rendered version of that by calling render again and giving the new props, state and context.">
            <Image width="100%" src={images.vdom32}/>
          </Slide>
          <Slide bgColor="primary" notes="It point's the div's currentElement property to the new element.">
            <Image width="100%" src={images.vdom32}/>
          </Slide>
          <Slide bgColor="primary" notes="If it had updates to the div's DOM properties, it would do those now, but it doesn't.">
            <Image width="100%" src={images.vdom32}/>
          </Slide>
          <Slide bgColor="primary" notes="Then it goes through the same child process it did before. It flattens them into an array with keys. It goes through the two arrays and compares the children">
            <Image width="100%" src={images.vdom32}/>
          </Slide>
          <Slide bgColor="primary" notes="It gets to the button. Since nothing has changed, it doesn't need to go over to the DOM">
            <Image width="100%" src={images.vdom32}/>
          </Slide>
          <Slide bgColor="primary" notes="It gets to the first item. It computes the nextProps, nextContext and nextState for the item. Then it will call render to figure out the next element.">
            <Image width="100%" src={images.vdom32}/>
          </Slide>
          <Slide bgColor="primary" notes="The rendered element is a div and it only has a single child, which is a number. From this, React knows it's at a leaf and it can see if the DOM needs to be updated. It does the comparison between the old content and the new, sees that it needs to update it. It follows the arrow to figure out which node this corresponds to. Then it makes the update on that node.">
            <Image width="100%" src={images.vdom32}/>
          </Slide>





          <Slide bgColor="primary" notes="So that's how React makes things faster. It figures out the smallest number of changes that it needs to make to the DOM and batches them all together so the browser can do a smaller number of reflows. But there's still a good amount of work happening here. We can reduce the amount of work done here further by telling React a little bit more about the specifics of our app and giving it a few shortcuts it can take. These are the optimizations you hear people talking about. The first of these is one you probabaly know about...">
            <Image width="100%" src={images.vdom32}/>
          </Slide>
          <Slide bgColor="primary" notes="because React tells you. Whenever you're creating an array of children using map, it's going to tell you that you should be using keys. So I want to show you why this helps.">
            <Image width="100%" src={images.vdom32}/>
          </Slide>
          <Slide bgColor="primary" notes="Let's change up our example to one that will really highlight this. This time instead of an ExponentialList, we're going to have a SortableList. When you click the button, it's going to reverse order">
            <Image width="100%" src={images.vdom32}/>
          </Slide>
          <Slide bgColor="primary" notes="So we go through setState and get all the way to where it creates the new flattened array and compares it to the old one">
            <Image width="100%" src={images.vdom32}/>
          </Slide>
          <Slide bgColor="primary" notes="Let's take a closer look at how it does this comparison. As I mentioned, it gives each item a name, called a key. When React is doing the comparison between the old and the new, it will match them using the key. Well, when React assigns this, it just uses the array position of the item. So for almost everything in the list (except the middle item), React thinks that the value has changed when it has really just moved.">
            <Image width="100%" src={images.vdom32}/>
          </Slide>
          <Slide bgColor="primary" notes="So it will end up replacing the contents of the items, except the middle one.">
            <Image width="100%" src={images.vdom32}/>
          </Slide>
          <Slide bgColor="primary" notes="Now let's say we had given React meaningful keys... say, the name of the fruit. It would be able to compare each to the correct previous element and realize that nothing had changed">
            <Image width="100%" src={images.vdom32}/>
          </Slide>
          <Slide bgColor="primary" notes="So it would know that it could just reorder the DOM elements. Now, in this case it doesn't really save you much work. But just imagine if each of these items in the list was a complex DOM structure with lots of nodes. That could be a real time savings. But it's only really a time savings if your list is going to be reordered... for example, if you are reversing the order or shifting items off of the top. Otherwise, the keys that React provides using the array index will work just the same as any key you give. This is one of the reasons that it's important to understand the why behind the recommendation... because recommendations don't always have the same impact across different use cases.">
            <Image width="100%" src={images.vdom32}/>
          </Slide>


          <Slide bgColor="primary" notes="Let's look at a use case where keys wouldn't have as much of an impact, but where another trick would. It's a list where new items are being fetched from a server and added to the end of the list.">
            <Image width="100%" src={images.vdom32}/>
          </Slide>
          <Slide bgColor="primary" notes="And lets say the user pushes the button but there are no new messages.">
            <Image width="100%" src={images.vdom32}/>
          </Slide>
          <Slide bgColor="primary" notes="React is going to go through the process of building out the render tree—creating the elements and updating the instances—even though nothing needs to change in the DOM. This is called wasted time. You can see it in React perf tools. So how can you avoid wasting time like this? I'm sure you've heard of one way...">
            <Image width="100%" src={images.vdom32}/>
          </Slide>
          <Slide bgColor="primary" notes="that's shouldComponentUpdate. When a component has a shouldComponentUpdate method, React will use it to short circuit work. Once it figures out the new state and props it will say to the component, 'Hey, should I even bother rendering you?' The component has a chance to check the old state and props vs the new state and props">
            <Image width="100%" src={images.imageName}/>
          </Slide>
          <Slide bgColor="primary" notes="So that might look something like this">
            <Image width="100%" src={images.imageName}/>
          </Slide>
          <Slide bgColor="primary" notes="This is great, because we can skip computing the whole rest of this subtree... If you were looking closely at that shouldComponentUpdate, you might have noticed a potential bug though. It depends on how you're updating the state.">
            <Image width="100%" src={images.imageName}/>
          </Slide>
          <Slide bgColor="primary" notes="If you were updating it this way... by setting a new variable to this.state.items, pushing a new item onto the array, and then calling setState with that, then you would see this bug. What would happen is that you'd never see new messages. Your shouldComponentUpdate would always return false. Why is this?">
            <Image width="100%" src={images.imageName}/>
            <pre>
              let newArray = this.state.items;
  newArray.push("test");
  this.setState({items: newArray})
  </pre>
          </Slide>
          <Slide bgColor="primary" notes="It's because even though you have two names for this thing, both names still point to the same thing. So they are equal, because they are just different names for the same exact thing. If you change this.state.items, you're also changing newArray and vice versa. One way to fix this is to create a new object each time...">
            <Image width="100%" src={images.imageName}/>
          </Slide>
          <Slide bgColor="primary" notes="So for example, using concat to generate a new array based on the old one. However, that would break our shouldComponentUpdate in the other direction. It would return true each time. That's because each pass through, there is a new object. You could make it work by doing a deepEquals...">
            <Image width="100%" src={images.imageName}/>
            <pre>
              let newMessages = fetchMessages();
  let newArray = this.state.items.concat(newMessages);
  this.setState({items: newArray})
  </pre>
          </Slide>
          <Slide bgColor="primary" notes="but depending on how many times this runs through shouldComponentUpdate and how complicated the state structure is, that might actually take more work, not less. It would be nice to have that simple, quick equals check but still catch changes to the data.">
            <Image width="100%" src={images.imageName}/>
          </Slide>
          <Slide bgColor="primary" notes="And this is what immutability gives you. With immutable data, if two variables are pointing to the same object, you know that the data hasn't changed. If it does need you change, you create a new object. So if you're using immutable data, then you can do these simple equality checks, which are fast.">
            <Image width="100%" src={images.imageName}/>
          </Slide>
          <Slide bgColor="primary" notes="Now one thing you have to watch out for with Immutability as it's done in JS is nested data structures. With libraries like Immutable.js, you can have the top level object be immutable, but lower level objects are not. So changes could still be happening deep in the data structure, which negates the purpose.">
            <Image width="100%" src={images.imageName}/>
          </Slide>
          <Slide bgColor="primary" notes="but you can make the other levels of the data structure immutable, too, and reflect changes up the chain to the top level object. So if an object down here changes, it gets a new identity, and it's parent gets a new identity, and the top level object gets a new identity.">
            <Image width="100%" src={images.imageName}/>
          </Slide>
          <Slide bgColor="primary" notes="If you're using immutable structures like this, you can actually skip writing your own shouldComponentUpdate functions all together and use PureRenderMixin, which just applies the same simple shouldComponentUpdate to everything.">
            <Image width="100%" src={images.imageName}/>
          </Slide>



          <Slide bgColor="primary" notes="... so I've just told you about shouldComponentUpdate. Now I'm going to tell you that maybe you should not use shouldComponentUpdate. No, I'm not going to tell you... ">
            <Image width="100%" src={images.imageName}/>
          </Slide>
          <Slide bgColor="primary" notes="everyone's favorite developer is. It turns out that sometimes you can get better performance gains by using containers at lower levels of your component tree. So if you use Redux, this means you don't just have one component at the top of your tree that uses connect(), but that you have multiple places where connect() is called. This way you don't have to pass all the props down the tree and trigger rerenders for all of the parents.">
            <Image width="100%" src={images.imageName}/>
          </Slide>
          <Slide bgColor="primary" notes="So how does this work? Well, connect() implements shouldComponentUpdate for you.">
            <Image width="100%" src={images.imageName}/>
          </Slide>





          <Slide bgColor="primary" notes="">
            <Image width="100%" src={images.imageName}/>
            <div>Some options to try:</div>
            <ul>
              <li>keys</li>
              <li>shouldComponentUpdate</li>
              <li>immutability and PureRenderMixin</li>
              <li>using containers</li>
            </ul>
          </Slide>
          <Slide bgColor="primary" notes="I hope this has given you a good overview of a few starting points. As you can see, there are lots of tweaks you can make. Some of them are right for certain cases, some for others. Some will actually have negative impacts if used for the wrong use cases. This is why people say to measure, and hopefully this talk has given you a good framework for understanding what you're measuring.">
            <Image width="100%" src={images.imageName}/>
          </Slide>
        </Deck>
      </Spectacle>
    );
  }
}
