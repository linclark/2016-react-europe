// Import React
import React from "react";

// Import Spectacle Core tags
import {
  Appear,
  BlockQuote,
  Cite,
  CodePane,
  Code,
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


const imageSets = {
  performance: 2,
  calendar: 6,
  mainThread: 13,
  ui: 12,
  vdom: 35,
  notecard: 4,
  flatten: 3,
  ss: 15,
  flush: 5,
  keyWarning: 1,
  keys: 3,
  immutable: 6,
  keyComparison: 6,
}

const images = {
  me: require("../assets/lores/me.png"),
};

let num;
let index;
for (var prefix in imageSets) {
  num = imageSets[prefix];
  for (let i = 1; i < num + 1; i++) {
    index = i < 10 ? `0${i}` : i;
    images[`${prefix}${index}`] = require(`../assets/lores/${prefix}${index}.png`);
  }
};



preloader(images);

const theme = createTheme({
  primary: "#ffffff"
},
{
  primary: "codecartoons"
});

export default class Presentation extends React.Component {
  render() {
    return (
      <Spectacle theme={theme}>
        <Deck transition={["fade"]} transitionDuration={1000}>
          <Slide bgColor="primary" notes="">
            <Image width="100%" src={images.imageName}/>
          </Slide>
          <Slide bgColor="primary" notes="Hi, I'm Lin Clark and I make code cartoons" bgImage={images.me}>
            <Heading size="2" padding="0 120px 0 0">
              Hi, I'm <Link href="https://twitter.com/linclark">@linclark</Link> and I make <Link href="https://twitter.com/codecartoons">@codecartoons</Link>.
            </Heading>
          </Slide>

          <Slide bgColor="primary" notes={`
            <ul>
            <li>work for mozilla</li>
            </ul>
            `}>
            <Image width="100%" src={images.imageName}/>
          </Slide>
          <Slide bgColor="primary" notes="I should start by saying I'm not going to be telling you anything that you haven't already heard. I'm going to be talking about things like keys, and shouldComponentUpdate, and immutability. The reason I wanted to talk about them though...">
            <Image width="100%" src={images.performance01}/>
          </Slide>
          <Slide bgColor="primary" notes={`
            <ul>
            <li>fuzzy understanding</li>
            <li>hard to take the time to bring into focus</li>
            <li>concepts on top</li>
            <li>received knowledge</li>
            <li>I want to bring into focus</li>
            </ul>
            `}>
            <Image width="100%" src={images.performance02}/>
          </Slide>
          <Slide bgColor="primary" notes={`
            <ul>
            <li>better understanding</li>
            <li>...</li>
            <li>I'm focusing on specific part</li>
            <li>React render performance</li>
            </ul>
            `}>
            <Image width="100%" src={images.performance01}/>
          </Slide>
          <Slide bgColor="primary" notes={`
            <ul>
            <li>So the talk's going to go a little something like this</li>
            </ul>
            `}>
            <ol style={{textAlign: "left"}}>
            <Appear><li>The basics of browser rendering</li></Appear>
            <Appear><li>How the virtual DOM speeds rendering up</li></Appear>
            <Appear><li>What you can do to make it faster</li></Appear>
            </ol>
          </Slide>
          <Slide bgColor="primary" notes={`
            <ul>
            <li>Let's start with 1</li>
            <li>...</li>
            <li>how the browser builds your web page</li>
            <li>you can think of it like how you build your web page</li>
            </ul>
            `}>
            <ol style={{textAlign: "left"}}>
            <li>The basics of browser rendering</li>
            </ol>
          </Slide>



          <Slide bgColor="primary" notes={`
            <ul>
            <li>The work takes place over time</li>
            </ul>
            `}>
            <Image width="100%" src={images.calendar01}/>
          </Slide>
          <Slide bgColor="primary" notes="The first, initial render is kind of like the launch of the site... ">
            <Image width="100%" src={images.calendar02}/>
          </Slide>
          <Slide bgColor="primary" notes="and then every interaction is like a new feature release to the site.">
            <Image width="100%" src={images.calendar03}/>
          </Slide>
          <Slide bgColor="primary" notes="">
            <Image width="100%" src={images.calendar04}/>
          </Slide>
          <Slide bgColor="primary" notes="To extend this metaphor, your code is kind of like the project lead. It's the one planning the project and telling folks what to do. Unfortunately, only one person is assigned to do the work on the project... and that's the main thread.">
            <Image width="100%" src={images.calendar05}/>
          </Slide>
          <Slide bgColor="primary" notes="The main thread is kind of like a full stack developer... it takes care of all of these different things. It takes care of JavaScript, it takes care of doing things with the DOM, and it takes care of layout, figuring out what should go on the page and what the layout of those things. so just as when you're working on a project in real life, if you want to deliver things quickly, you're going to need to limit the work that you're putting on this one worker bee that you have. You don't want to overload them. You need to reduce the amount of work. And that's really what performance is about, reducing the amount of work you need to do. but before we know how to reduce the amount of work that the main thread is doing, we need to know more about the work that the main thread does.">
            <Image width="100%" src={images.calendar06}/>
          </Slide>


          <Slide bgColor="primary" notes="As I mentioned before, the main thread is in charge of JavaScript, the DOM, and layout.">
            <Image width="100%" src={images.mainThread01}/>
          </Slide>
          <Slide bgColor="primary" notes="You obviously know what JavaScript is, because that's where your code lives. That's all of the functions your code is defining and calling.">
            <Image width="100%" src={images.mainThread02}/>
          </Slide>
          <Slide bgColor="primary" notes="The DOM is the way the functions tell the page what to do. Basically the DOM gives you a set of objects that you can move around and manipulate in order to get the browser to change the page. The way this works is that there's something behind the scenes called the render tree.">
            <Image width="100%" src={images.mainThread03}/>
          </Slide>
          <Slide bgColor="primary" notes="The main thread combines the DOM with CSS to create the render tree and then figures out a thing called the box model from that. That's what gets passed off to the thing doing the painting. But the main thread doesn't do that recomputation every time the DOM changes. If it did, it would be spending most of it's time calculating what the browser should look like over and over again. Instead, what it tries to do is batch as many of these into the same group as possible.">
            <Image width="100%" src={images.mainThread04}/>
          </Slide>
          <Slide bgColor="primary" notes="Let's say that our code wants to change a class name on a button. ">
            <Image width="100%" src={images.mainThread05}/>
          </Slide>
          <Slide bgColor="primary" notes="">
            <Image width="100%" src={images.mainThread06}/>
          </Slide>
          <Slide bgColor="primary" notes="...and then add a div">
            <Image width="100%" src={images.mainThread07}/>
          </Slide>
          <Slide bgColor="primary" notes="">
            <Image width="100%" src={images.mainThread08}/>
          </Slide>
          <Slide bgColor="primary" notes="... and then add another button.">
            <Image width="100%" src={images.mainThread09}/>
          </Slide>
          <Slide bgColor="primary" notes=" The main thread would keep making these changes to the DOM without recalulating the render tree. Then, once a recalcuation was scheduled....">
            <Image width="100%" src={images.mainThread10}/>
          </Slide>
          <Slide bgColor="primary" notes="it would go over to the render tree and recalculate everything together.">
            <Image width="100%" src={images.mainThread11}/>
          </Slide>
          <Slide bgColor="primary" notes="So we want to reduce the amount of work that the main thread has to do. Two good ways are 1. don't have your JS code make changes to the DOM unless they are necessary, and 2. if the JS code does have to make changes, be considerate to the main thread and how it works and group the requests for changes. That way the main thread can batch them.">
            <Image width="100%" src={images.mainThread12}/>
          </Slide>
          <Slide bgColor="primary" notes="And this is something that React helps you do. Now I want to be clear... React isn't the only way to do this. It's not actually a necessary part of doing this. These ideas have been around since well before React. These are already an accepted part of web development practice. So you can get as good or better performance with vanilla JS as you can React. It's not that React is necessarily faster than vanilla.">
            <Image width="100%" src={images.mainThread12}/>
          </Slide>
          <Slide bgColor="primary" notes="The thing is, though, in order to get that performance, your code has to be smart. Your code needs to know how to direct the main thread pretty precisely to do these things.">
            <Image width="100%" src={images.mainThread12}/>
          </Slide>
          <Slide bgColor="primary" notes="To go back to the metaphor, your code, the project lead on this project, needs to be both a really really good product manager... it needs to know what you should ship, and it also needs to be a really really good tech lead, it needs to know the most efficient way to direct the main thread in shipping.">
            <Image width="100%" src={images.mainThread12}/>
          </Slide>
          <Slide bgColor="primary" notes="Of course, your code is only as smart as you make it. So it means that all of the developers on your team have to have a really solid grasp of all of these concepts, and also not make mistakes. What React does for you is that it offloads that work. ">
            <Image width="100%" src={images.mainThread12}/>
          </Slide>
          <Slide bgColor="primary" notes="It's kind of like your code brings in a consultant to do the tech lead work, which frees up your code to just be a good product manager... to specifically focus on what needs to happen, not on how to make it happen, but on what the product should do, what the page should display. So let's take a look at how these two—React and your code—work together to direct the main thread.">
            <Image width="100%" src={images.mainThread13}/>
          </Slide>
          <Slide bgColor="primary" notes={`
            <ul>
            <li>And this brings us to part two</li>
            </ul>
            `}>
            <ol style={{textAlign: "left"}}>
            <li>The basics of browser rendering</li>
            <Appear><li>How the virtual DOM speeds rendering up</li></Appear>
            </ol>
          </Slide>
          <Slide bgColor="primary" notes="We'll start with the webpage that your team is going to be building... a button with a list.">
            <Image width="100%" src={images.ui01}/>
          </Slide>
          <Slide bgColor="primary" notes="When you click the button, it will multiply the value by itself">
            <Image width="100%" src={images.ui02}/>
          </Slide>
          <Slide bgColor="primary" notes=".... So let's walk through the initial render.">
            <Image width="100%" src={images.ui03}/>
          </Slide>


          <Slide bgColor="primary" notes="I'm going to start from the very beginning.">
            <Image width="100%" src={images.vdom01}/>
          </Slide>
          <Slide bgColor="primary" notes="The user has downloaded a page.">
            <Image width="100%" src={images.vdom02}/>
          </Slide>
          <Slide bgColor="primary" notes="That page has at least one HTML element. This will be the container for the React app">
            <Image width="100%" src={images.vdom03}/>
          </Slide>
          <Slide bgColor="primary" notes="At this point, React has been loaded and so has your code,">
            <Image width="100%" src={images.vdom04}/>
          </Slide>
          <Slide bgColor="primary" notes="including components... which are basically deputy product managers in charge of specific parts of the product.">
            <Image width="100%" src={images.vdom05}/>
          </Slide>
          <Slide bgColor="primary" notes="So now we get to this. This is what we'll be walking through. The initial render. You'll notice that we create an element as part of this... that list tag. What is an element?">
            <Code>
              ReactDOM.render(&lt;List /&gt;, document.getElementById("app"))
            </Code>
          </Slide>
          <Slide bgColor="primary" notes="It's a way for your code to hand off requirements to React. Following the analogy, it's like a little notecard that has a few notes about what React needs to build.">
            <Heading size={2}>What's an element?</Heading>
            <Image width="100%" src={images.notecard01}/>
          </Slide>
          <Slide bgColor="primary" notes="It has the type, which is the component that's going to be used, and it has the props and the children.">
            <Heading size={2}>What's an element?</Heading>
            <Image width="100%" src={images.notecard02}/>
          </Slide>
          <Slide bgColor="primary" notes="React will hold on to this element until it's ready to build the thing, and what it builds is an instance of the component... the thing that holds on to the state and the refs and everything.">
            <Heading size={2}>What's an element?</Heading>
            <Image width="100%" src={images.notecard04}/>
          </Slide>
          <Slide bgColor="primary" notes="So your code asks for an element">
            <Image width="100%" src={images.vdom06}/>
          </Slide>
          <Slide bgColor="primary" notes="and React creates it">
            <Image width="100%" src={images.vdom07}/>
          </Slide>
          <Slide bgColor="primary" notes="Then your code tells React to start rendering that element into the container">
            <Image width="100%" src={images.vdom08}/>
          </Slide>
          <Slide bgColor="primary" notes="This begins the construction of the render tree. This is going to be a bit of a process. If you don't follow, don't worry... this is being recordeded so you can watch later. React starts off by creating this thing called the TopLevelWrapper...">
            <Image width="100%" src={images.vdom08}/>
          </Slide>
          <Slide bgColor="primary" notes="which is really just for its own organization.">
            <Image width="100%" src={images.vdom09}/>
          </Slide>
          <Slide bgColor="primary" notes="React creates an instance for the TopLevelWrapper.">
            <Image width="100%" src={images.vdom10}/>
          </Slide>
          <Slide bgColor="primary" notes="and React has wired it up so that it renders to the List component.">
            <Image width="100%" src={images.vdom11}/>
          </Slide>
          <Slide bgColor="primary" notes="and React has wired it up so that it renders to the List component.">
            <Image width="100%" src={images.vdom12}/>
          </Slide>
          <Slide bgColor="primary" notes="To do that, it starts creating the List instance. It sets the props and the state on the instance. Then it realizes that it doesn't know what gets shown for a List... if it were a div or something like that, some component that React provides, it would know what to do. But since it doesn't know, it asks the List component. And the way it asks is by calling render.">
            <Image width="100%" src={images.vdom13}/>
          </Slide>
          <Slide bgColor="primary" notes="So List component tells React to create a bunch of different elements... an Item element for each item in this.state.items, a button element, and then a div element to wrap those.">
            <Image width="100%" src={images.vdom14}/>
          </Slide>
          <Slide bgColor="primary" notes="React creates these elements... it doesn't care about the fact that it doesn't know what Item renders to yet. and then">
            <Image width="100%" src={images.vdom19}/>
          </Slide>
          <Slide bgColor="primary" notes="It starts to instantiate the div because the div is the wrapper. The div contains all the other elements">
            <Image width="100%" src={images.vdom21}/>
          </Slide>
          <Slide bgColor="primary" notes="Since that's a native component, one of it's internal components, it knows exactly what kind of DOM interaction it needs to do to create it. So it does that.">
            <Image width="100%" src={images.vdom22}/>
          </Slide>
          <Slide bgColor="primary" notes="It crosses over to the DOM and creates a div. Note that it didn't make the div a child of the app container yet. That would have caused a reflow..... So now it needs to create instances for the children... that is, the button and each of the items. To make it easier to handle, it turns a complex child structure into a flat one.">
            <Image width="100%" src={images.vdom23}/>
          </Slide>
          <Slide bgColor="primary" notes="So the element has this array of children. When React flattens them, it gives each one a name. The button is .0">
            <Image width="100%" src={images.flatten01}/>
          </Slide>
          <Slide bgColor="primary" notes="">
            <Image width="100%" src={images.flatten02}/>
          </Slide>
          <Slide bgColor="primary" notes="and then the items each get a name that starts with 1, because that was the index of the array, and then includes the index within the array. If the items had keys assigned, those would have been used for the second value instead of their indexes. This becomes important later.">
            <Image width="100%" src={images.flatten03}/>
          </Slide>
          <Slide bgColor="primary" notes="so it creates the instances">
            <Image width="100%" src={images.vdom23}/>
          </Slide>
          <Slide bgColor="primary" notes="Now that the instances are created, it's time to make DOM elements.">
            <Image width="100%" src={images.vdom24}/>
          </Slide>
          <Slide bgColor="primary" notes="The button is a native component, so React creates it">
            <Image width="100%" src={images.vdom25}/>
          </Slide>
          <Slide bgColor="primary" notes="The item is another composite component, so React has to ask what it renders to.">
            <Image width="100%" src={images.vdom26}/>
          </Slide>
          <Slide bgColor="primary" notes="It renders to a div">
            <Image width="100%" src={images.vdom27}/>
          </Slide>
          <Slide bgColor="primary" notes="React creates the element">
            <Image width="100%" src={images.vdom28}/>
          </Slide>
          <Slide bgColor="primary" notes="and the instance for it">
            <Image width="100%" src={images.vdom29}/>
          </Slide>
          <Slide bgColor="primary" notes="and because div is a component it understands, it creates the DOM node too">
            <Image width="100%" src={images.vdom30}/>
          </Slide>
         <Slide bgColor="primary" notes="and it does this two more times to create the full DOM that needs to be inserted">
            <Image width="100%" src={images.vdom31}/>
          </Slide>
         <Slide bgColor="primary" notes="then it goes over to the DOM and wires the children up to the parent.">
            <Image width="100%" src={images.vdom32}/>
          </Slide>
          <Slide bgColor="primary" notes="And then it hooks up the wrapper div to the container div.">
            <Image width="100%" src={images.vdom33}/>
          </Slide>
          <Slide bgColor="primary" notes="This is when you get the reflow. So that's the initial render. That's what happens when you call React.render() in your webpage. We have the element tree which is constructed, and that provides some hints about what instance should be constructed, or how the instance should be changed. And then that instance is used to figure out how the DOM should change.">
            <Image width="100%" src={images.vdom34}/>
          </Slide>
          <Slide bgColor="primary" notes="So now let's take a look at what happens when you do change the DOM... when you actually update the DOM because the user has clicked on something.">
            <Image width="100%" src={images.vdom35}/>
          </Slide>




          <Slide bgColor="primary" notes="The user clicks the button.">
            <Image width="100%" src={images.ui01}/>
          </Slide>
          <Slide bgColor="primary" notes="">
            <Image width="100%" src={images.ui02}/>
          </Slide>
          <Slide bgColor="primary" notes="React figures out the onClick handler for this. ">
            <Image width="100%" src={images.vdom35}/>
          </Slide>
          <Slide bgColor="primary" notes="This click handler was created in the List instance and we bound it to the list, so when we call this.setState...">
            <Image width="100%" src={images.ss01}/>
          </Slide>
          <Slide bgColor="primary" notes="it calls setState() on the instance. So what happens when setState is called?">
            <Image width="100%" src={images.ss02}/>
          </Slide>
          <Slide bgColor="primary" notes="React doesn't immediately handle the state change. Instead, it adds the state to the list of state changes the instance needs to make.">
            <Image width="100%" src={images.flush01}/>
          </Slide>
          <Slide bgColor="primary" notes="Then it adds the instance to what's called the dirty components array. It will go on to handle any other setState() calls triggered by this and add those to the dirty component array too. This gives it a chance to batch updates, which can help with the reflow problem.">
            <Image width="100%" src={images.flush02}/>
          </Slide>
          <Slide bgColor="primary" notes="After it has taken care of all the changes that were possibly triggered, it comes back to this queue and flushes it.">
            <Image width="100%" src={images.flush03}/>
          </Slide>
          <Slide bgColor="primary" notes="">
            <Image width="100%" src={images.flush04}/>
          </Slide>
          <Slide bgColor="primary" notes="We only have one component in the queue, so that is the only one we'll process.">
            <Image width="100%" src={images.flush05}/>
          </Slide>



          <Slide bgColor="primary" notes="The component that had setState() called is treated as the root of a subtree, so we start processing from there.">
            <Image width="100%" src={images.ss02}/>
          </Slide>
          <Slide bgColor="primary" notes="I'm going to turn the existing tree grey. All of this grey are the previous elements and rendered components. They'll be used for comparing against the next.">
            <Image width="100%" src={images.ss03}/>
          </Slide>
          <Slide bgColor="primary" notes="React calculates what the list's next context, props, and state would be. Then it sets these on the instance.">
            <Image width="100%" src={images.ss04}/>
          </Slide>
          <Slide bgColor="primary" notes="It asks the List instance what it should render to now and together with the list instance it creates the new element with its children.">
            <Image width="100%" src={images.ss06}/>
          </Slide>
          <Slide bgColor="primary" notes="Then it goes through the same child process it did before. It flattens them into an array with keys. It goes through the two arrays and compares the children. The button hasn't changed so it does nothing. Then it gets to the item">
            <Image width="100%" src={images.ss07}/>
          </Slide>
          <Slide bgColor="primary" notes="Since the first item didn't change, it just creates the element and updates the instance">
            <Image width="100%" src={images.ss08}/>
          </Slide>
          <Slide bgColor="primary" notes="but doesn't make any changes to the DOM for it.">
            <Image width="100%" src={images.ss09}/>
          </Slide>
          <Slide bgColor="primary" notes="Now we get to the second item.">
            <Image width="100%" src={images.ss10}/>
          </Slide>
          <Slide bgColor="primary" notes="When React updates the instance it sees that this one does need a change to the DOM.">
            <Image width="100%" src={images.ss11}/>
          </Slide>
          <Slide bgColor="primary" notes="so it makes that change">
            <Image width="100%" src={images.ss12}/>
          </Slide>
          <Slide bgColor="primary" notes="Then it does the same thing for the third.">
            <Image width="100%" src={images.ss13}/>
          </Slide>
          <Slide bgColor="primary" notes="Because these happened in quick succession, they probably were handled in the same reflow">
            <Image width="100%" src={images.ss14}/>
          </Slide>
          <Slide bgColor="primary" notes="">
            <Image width="100%" src={images.ss15}/>
          </Slide>




          <Slide bgColor="primary" notes="So that's how React makes things faster. It figures out the smallest number of changes that it needs to make to the DOM and batches them all together so the browser can do a smaller number of reflows. But there's still a good amount of work happening here. how can we reduce this? The first technique is probably one you know">
            <Image width="100%" src={images.imageName}/>
          </Slide>
          <Slide bgColor="primary" notes="because React tells you. Whenever you're creating an array of children using map, it's going to tell you that you should be using keys. So I want to show you why this helps.">
            <Image width="100%" src={images.keyWarning01}/>
          </Slide>
          <Slide bgColor="primary" notes="Let's change up our example to one that will really highlight this. This time we're going to have a sortable List.">
            <Image width="100%" src={images.ui04}/>
          </Slide>
          <Slide bgColor="primary" notes="When you click the button, it's going to reverse order">
            <Image width="100%" src={images.ui05}/>
          </Slide>
          <Slide bgColor="primary" notes="">
            <Image width="100%" src={images.ui06}/>
          </Slide>
          <Slide bgColor="primary" notes="So we go through setState and get all the way to where it creates the new flattened array and compares it to the old one">
            <Image width="100%" src={images.ss07}/>
          </Slide>
          <Slide bgColor="primary" notes="Let's take a closer look at how it does this comparison.">
            <Image width="100%" src={images.keyComparison03}/>
          </Slide>
          <Slide bgColor="primary" notes="It's going to compare these items based on the name. But that means its comparing apples to oranges, because the name is determined by the position in the list and we just reversed the list.">
            <Image width="100%" src={images.keyComparison04}/>
          </Slide>
          <Slide bgColor="primary" notes="It thinks it needs to update the values of all of the items except the middle one, because they all look different than they used to.">
            <Image width="100%" src={images.keys02}/>
          </Slide>
          <Slide bgColor="primary" notes="Now let's say we had given React meaningful keys...">
            <Image width="100%" src={images.keyComparison04}/>
          </Slide>
          <Slide bgColor="primary" notes="say, the name of the fruit.">
            <Image width="100%" src={images.keyComparison05}/>
          </Slide>
          <Slide bgColor="primary" notes="It would be able to compare each to the correct previous element and realize that nothing had changed">
            <Image width="100%" src={images.keyComparison06}/>
          </Slide>
          <Slide bgColor="primary" notes="So it would know that it could just reorder the DOM elements. Now, in this case it doesn't really save you much work. But just imagine if each of these items in the list was a complex DOM structure with lots of nodes. That could be a real time savings. But it's only really a time savings if your list is going to be reordered... for example, if you are reversing the order or shifting items off of the top. Otherwise, the keys that React provides using the array index will work just the same as any key you give. This is one of the reasons that it's important to understand the why behind the recommendation... because recommendations don't always have the same impact across different use cases.">
            <Image width="100%" src={images.keys03}/>
          </Slide>


          <Slide bgColor="primary" notes="Let's look at a use case where keys wouldn't have as much of an impact, but where another trick would. It's a list where new items are being fetched from a server and added to the end of the list.">
            <Image width="100%" src={images.ui07}/>
          </Slide>
          <Slide bgColor="primary" notes="And lets say the user pushes the button....">
            <Image width="100%" src={images.ui08}/>
          </Slide>
          <Slide bgColor="primary" notes="but there are no new messages.">
            <Image width="100%" src={images.ui07}/>
          </Slide>
          <Slide bgColor="primary" notes="React is going to go through the process of building out the render tree—creating the elements and updating the instances—even though nothing needs to change in the DOM. This is called wasted time. You can see it in React perf tools. So how can you avoid wasting time like this? I'm sure you've heard of one way...">
            <Image width="100%" src={images.scu01}/>
          </Slide>
          <Slide bgColor="primary" notes="that's shouldComponentUpdate. When a component has a shouldComponentUpdate method, React will use it to short circuit work. Once it figures out the new state and props it will say to the component, 'Hey, should I even bother rendering you?' The component has a chance to check the old state and props vs the new state and props">
            <pre style={{textAlign: "left"}}>
{`shouldComponentUpdate(nextProps, nextState) {
  if (this.state.items !== nextState.items) {
    return false
  }
  return true
}`}
              </pre>
          </Slide>
          <Slide bgColor="primary" notes="The way this works is when the user click and this.setState is called`">
            <Image width="100%" src={images.scu02}/>
          </Slide>
          <Slide bgColor="primary" notes="before building up the render tree below the list, React will ask the component a question.">
            <Image width="100%" src={images.scu03}/>
          </Slide>
          <Slide bgColor="primary" notes="It will say, if I give you these next props and next state, do you need to update?">
            <Image width="100%" src={images.scu04}/>
          </Slide>
          <Slide bgColor="primary" notes="If the component says no, then React doesn't call render and doesn't do anything else to that component or its children.">
            <Image width="100%" src={images.scu05}/>
          </Slide>
          <Slide bgColor="primary" notes="This is great, because we can skip computing the whole rest of this subtree... If you were looking closely at that shouldComponentUpdate, you might have noticed a potential bug though. It depends on how you're updating the state.">
            <Image width="100%" src={images.scu03}/>
          </Slide>
          <Slide bgColor="primary" notes="If you were updating it this way... by setting a new variable to this.state.items, pushing a new item onto the array, and then calling setState with that, then you would see this bug. What would happen is that you'd never see new messages. Your shouldComponentUpdate would always return false. Why is this?">
            <pre style={{textAlign: "left"}}>
{`nextItems = this.state.items
nextItems.push(msg)
this.setState({items: nextItems})`
}
              </pre>
          </Slide>
          <Slide bgColor="primary" notes="It's because even though you have two names for this thing">
            <Image width="100%" src={images.immutable01}/>
          </Slide>
          <Slide bgColor="primary" notes="both names still point to the same thing. So they are equal, because they are just different names for the same exact thing. So even if you make a change...">
            <Image width="100%" src={images.immutable02}/>
          </Slide>
          <Slide bgColor="primary" notes="the should component update is going to think the old state and the new state is the same.">
            <Image width="100%" src={images.immutable03}/>
          </Slide>
          <Slide bgColor="primary" notes="You could make it so that nextState is its own object. But this makes the shouldComponentUpdate useless. It will think that something has changed even if nothing has because these two are different objects. We could get around this using deep equal, but depending on how many times this runs through shouldComponentUpdate and how complicated the state structure is, that might actually take more work, not less. It would be nice to have that simple, quick equals check but still catch changes to the data.">
            <Image width="100%" src={images.immutable04}/>
          </Slide>
          <Slide bgColor="primary" notes="And this is what immutability gives you. With immutable data, if two variables are pointing to the same object, you know that the data hasn't changed.">
            <Image width="100%" src={images.immutable05}/>
          </Slide>
          <Slide bgColor="primary" notes="If it does need you change, you create a new object. So if you're using immutable data, then you can do these simple equality checks, which are fast.">
            <Image width="100%" src={images.immutable06}/>
          </Slide>




          <Slide bgColor="primary" notes="... so I've just told you about shouldComponentUpdate. Now I'm going to tell you that maybe you should not use shouldComponentUpdate. No, I'm not going to tell you... ">
            <Image width="100%" src={images.imageName}/>
          </Slide>
          <Slide bgColor="primary" notes="everyone's favorite developer is. It turns out that sometimes you can get better performance gains by using containers at lower levels of your component tree. So if you use Redux, this means you don't just have one component at the top of your tree that uses connect(), but that you have multiple places where connect() is called. This way you don't have to pass all the props down the tree and trigger rerenders for all of the parents. So how does this work? Let's look at a a UI example">
            <Image width="100%" src={images.imageName}/>
          </Slide>
          <Slide bgColor="primary" notes="We have a todo list">
            <Image width="100%" src={images.ui10}/>
          </Slide>
          <Slide bgColor="primary" notes="">
            <Image width="100%" src={images.ui11}/>
          </Slide>
          <Slide bgColor="primary" notes="and you can see that these things change independently. How would most people handle the state change for this?">
            <Image width="100%" src={images.ui12}/>
          </Slide>
          <Slide bgColor="primary" notes="Well, you'd have a structure like this">
            <Image width="100%" src={images.connect01}/>
          </Slide>
          <Slide bgColor="primary" notes="The List component would get an array of items.">
            <Image width="100%" src={images.connect02}/>
          </Slide>
          <Slide bgColor="primary" notes="It would pass those down to each item element.">
            <Image width="100%" src={images.connect03}/>
          </Slide>
          <Slide bgColor="primary" notes="">
            <Image width="100%" src={images.connect04}/>
          </Slide>
          <Slide bgColor="primary" notes="What about when you want to change the middle item? when you check it off, for example">
            <Image width="100%" src={images.connect05}/>
          </Slide>
          <Slide bgColor="primary" notes="In order to do that, you have to change the item that's passed in from the list, which means you have to change the array that list receives. This means you're going to have to build out that render tree for list. But we can reduce the work here.">
            <Image width="100%" src={images.connect06}/>
          </Slide>
          <Slide bgColor="primary" notes="If we just pass in IDs">
            <Image width="100%" src={images.connect07}/>
          </Slide>
          <Slide bgColor="primary" notes="">
            <Image width="100%" src={images.connect08}/>
          </Slide>
          <Slide bgColor="primary" notes="">
            <Image width="100%" src={images.connect09}/>
          </Slide>
          <Slide bgColor="primary" notes="Then we can use the id to get the item from within the item component">
            <Image width="100%" src={images.connect10}/>
          </Slide>
          <Slide bgColor="primary" notes="Then, when we're going through rerendering ">
            <Image width="100%" src={images.connect11}/>
          </Slide>
          <Slide bgColor="primary" notes="Only the item we changed is getting new props.">
            <Image width="100%" src={images.connect12}/>
          </Slide>
          <Slide bgColor="primary" notes="This means Redux doesn't have to go through and rerender th">
            <Image width="100%" src={images.imageName}/>
          </Slide>
          <Slide bgColor="primary" notes="Up until now, we've been reducing the amount of work that happens at lower levels in the subtree. This solution reduces the amount of work we're doing at higher levels and sibling levels of the tree. So this is good for cases where you have something deeper in the tree that changes independently of the things around it, like todos.">
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
