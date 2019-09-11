#### Answer _by Austin McCay Orth_

Unfortunately, this is currently not only infeasible, but also impossible given Google's current offering. [Cloud Search only supports searches of assets within Google Suite][1]. You will also not be able to find answers in within our SO team in a regular Google search, since there is no search integration despite being able to sign into SO with your Google account.

If such a feature ever becomes available, though, we could definitely consider implementing it.

  [1]: https://support.google.com/cloudsearch/answer/7298696?hl=en&ref_topic=6262835

***

## How do you set up a local Redis instance?

This might not be a common issue since we have `dev-redis`, but IMO there isn't straightforward, Niche-developer-specific documentation on how to get started with Redis. 

There's [some documentation on the wiki][1] about how to update `dev-redis` or production with new data, but I think it would be useful to have a step-by-step process of setting up a local instance and populating it with the data from `dev-redis`.

Ideally, this step-by-step process would include explicit "type this in your shell" instructions on how to install and use the necessary tools to populate your local instance: [`enliten`][2], [`ipedler`][3], [`qprof`][4], [`realtorcomlocator`][5], and [`urlinator`][6].


  [1]: https://github.com/nicheinc/wiki/wiki/QA---Creating-A-New-Redis
  [2]: https://github.com/nicheinc/enliten
  [3]: https://github.com/nicheinc/legacy-new-world/tree/master/ipedler
  [4]: https://github.com/nicheinc/qprof
  [5]: https://github.com/nicheinc/realtorcomlocator
  [6]: https://github.com/nicheinc/urlinator

#### Answer _by Alejandro_

to add to this: 

`go get` commands didn't work for me until I stored github credentials. I'm pretty against it since it stores your credentials locally in plaintext but using ssh or hoping to get asked for a password didn't work for me.

To do so I did:
```  
$ git config credential.helper store
$ git pull (any repo)
Username:
Password:
```

The above permanently stores your credentials in your git config file after entering.  

To cache:  
`git config --global credential.helper "cache --timeout 1800"` (30 min)  

I personally still don't like having the file locally so after I'm finished I'll be deleting the file but `go get` does not seem to like to use ssh

#### Answer _by Joe McLaughlin_

We actually have a vagrant box for that! 

It was developed a while back but, to my knowledge, Scotto still uses it.

https://github.com/nicheinc/vagrantfiles/tree/dev/redis

It should spin up a VM with a redis fully installed. Once it's up, you can run the data population tools mentioned in the Wiki article you posted. 

Let me know if you run into any trouble.

#### Answer _by Josh Smith_

Joint effort from [@JoeMcLaughlin][1] and some [additional wiki docs Scotto wrote][2], here's an updated and generalized version of how to set up a local Redis instance from start to finish.

<hr>

#### 1. Clone the `vagrantfiles` repo and run the Redis Vagrant box<br><br>
    git clone https://github.com/nicheinc/vagrantfiles.git
    cd vagrantfiles/redis
    vagrant up
    exit

#### 2. If you haven't already, [set up Go on your machine][3].<br><br>
#### 3. Install and run the population tools (where `your-go-workspace/` is, well, the path to your Go workspace).<br><br>

    go get github.com/nicheinc/enliten && cd /your-go-workspace/src/github.com/nicheinc/enliten && go build && ./enliten
    go get github.com/nicheinc/qprof && cd /your-go-workspace/src/github.com/nicheinc/qprof && go build && ./qprof
    go get github.com/nicheinc/urlinator && cd /your-go-workspace/src/github.com/nicheinc/urlinator && go build && ./urlinator
    go get github.com/nicheinc/realtorcomlocator && cd /your-go-workspace/src/github.com/nicheinc/realtorcomlocator && go build && ./realtorcomlocator

**NOTE:** You may need MSSQL credentials to properly run `enliten`, `qprof`, and `urlinator`. If you don't have credentials, don't know if you have credentials, or are unsure of what they are, talk to [Austin][4].

#### 4. Now you can hit your local Redis instance at `redis://localhost:6379`.<br><br>

<hr>


That might be more verbose than most people need, but generally I need really, _really_ specific instructions 😅.

Not sure if anyone can edit someone's answer on SO, but if you can feel free to tweak this answer if it doesn't seem to work, or leave a comment with any suggested changes.


  [1]: https://stackoverflow.com/c/niche/a/16/3
  [2]: https://github.com/nicheinc/wiki/wiki/HOWTO-Get-the-tech-stack-up-and-running-on-your-local-machine#setup-instructions
  [3]: https://github.com/nicheinc/wiki/wiki/BE---Setup#installing-go
  [4]: https://stackoverflow.com/c/niche/users/2/

***

## How can I build a url to an entity's profile with a url fragment and entitytype?

I'd like to build a url from the following fields:

    {  
       entityName: "University of North Carolina at Chapel Hill",
       entityGuid: "5712b0c1-3a40-4ea1-a324-9c4f76fefd10",
       entityType: "College",
       entityFragment: "university-of-north-carolina-at-chapel-hill",
    }

buildEntityURL() from url-builder requires a vertical: https://github.com/nicheinc/Website/blob/dev/common/utils/url-builder.js#L171

Is there a function I can call that takes an entityType and returns a vertical?

Edit: Took Shawn's direction and got this working with the following commit https://github.com/nicheinc/Website/pull/3739/commits/5ad3eb19fb671cadb1a25bbc9b68dcf94a7b6bd3


  [1]: http://

#### Answer _by Shawn Rancatore_

You can use `entityTypeVertical` from here: [vertical.js][1] to infer the vertical from the entity type.
Note that you may also need to use: `entityCodeLookup`([entity-type.js][2]) to get the entity type code. 


  [1]: https://github.com/nicheinc/Website/blob/ad86d4e02cdcb07b785d12b18614f9657d1a9aa6/common/vertical.js#L138
  [2]: https://github.com/nicheinc/Website/blob/7a55863538ba3b9012a28198f2b2af079b0db254/common/entity-type.js#L81

***

## Test Question (hi #front-end)

Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

***

## After installing new packages, should all changes to the package-lock.json be committed?

Running `npm install --save <package>` updates many lines in the `package-lock.json`. Most changes are updates to the integrity hashes. Should these changes be committed? 

#### Answer _by Kim Cooperrider_

Yep! Changes should be committed to the lockfile. Additionally if we ever encounter merge conflicts from `dev`, for the best/least painful results we should delete the lockfile entirely and do a fresh install after the merge.  

Semi-related, the `--save` flag is now included by default with npm5+, so you don’t need to specify it (unless you prefer to do that). Alternatively, if you don't want to save a dep, your best bet is to install with `npm i --no-save <dep>`

***

## What is the protocol for adding images to the CDN and accessing them in the code?

In the directories on the Content Delivery Network (CDN), there are asset images that live in root level directories like `/rankings-silo/`. But most images live in `/static/{some more specific image dir}`. Where should we put new images and how do we tell the infrastructure team what we need?

#### Answer _by Spencer Kingman_

 1. When developing, add your images to the appropriate sub-directory of `app/images/`. 
 2. When you are ready for infrastructure to add the images to the CDN, push the newly added images to github.
 4. **@nicheinc/infrastructure** in the PR
 5. In your message to the infrastructure team, give the address to your assets in the repo under `app/images/`.
 6. Also in the message to the infrastructure team, provide the intended locations of your assets on CDN. These should be the same as the paths in step 3, except with `app/images/` swapped out for `/static/`

-----

In `.less` files we access the image with syntax like this:


    .illustrated-cta--realtor::before {
        background-image: url(~"@{cdn-prefix}static/cta/realtor-cta-graphic.svg");
    }



In `.js` files we build CDN urls with a function from `url-builder.js`

    photoUrl={buildCDNURL('static/cta/realtor-related-rankings-ads.jpg')}



Both examples would point to images in `/static/cta/` on the CDN.

***

## What do dimension12 and deviceCategory mean in the context of an A/B test?

I got these in the spec for an AB test and I don't really know what to make of them. https://github.com/nicheinc/team-good-ship-builders/issues/60.

Are they properties of the experiment object in `experiments.js`?

     - apply test to users on mobile web only
       - dimension12 = web and deviceCategory = mobile
     - custom dimension name: web_entry_static_cta_test

#### Answer _by Shawn Rancatore_

So the custom dimension name `web_entry_static_cta_test` is just the experiment key / name.
I believe that `dimension12 = web and deviceCategory = mobile` are only mentioned as ques for analysis, in order to make this mobile only you will have to setup the the differentiation of mobile vs desktop separately(ie we dont directly use `dimension12 web && deviceCategory = mobile`)

***

## Is it expected to write unit tests for A/B test projects? (#front-end)

I was wondering if it is expected to write unit tests for A/B tests, or merely to provide them when implementing a winning variation.

#### Answer _by Kim Cooperrider_

Yeah, a good question for sure... I definitely lean towards not doing any potentially throwaway work/echo Josh's thoughts, but it's also not so black and white because I could see merit in unit testing A/B test logic that touches mission critical things (anything around leads, for ex), or anything that feels brittle/messy where unit testing can help simplify by encouraging us to chunk out the logic better.

Another thought - to help manage expectations around effort and timelines, we might want to start(/keep?) being vocal about unit testing being a necessary part of hardening a test winner, since otherwise that sort of thing might be considered a walkoff-type project.

#### Answer _by Josh Smith_

I would say that—in general–it's okay to wait and only write unit tests for the winning variation, given the relatively short lifetime of tests.

However, there may be conditions where writing unit tests would be a good call, such as times where the A/B test is going to be live for a while, or maybe in cases where Jest snapshot tests are super-easy to implement (for projects that use Jest).

Definitely not conclusive, anyone else feel free to chime in :)

***

## Should I be using our <FormWrapper /> <FormGroup /> and <Checkbox /> components anytime I need to make a checkbox input? (#front-end)

[![enter image description here][1]][1]


  [1]: https://stackoverflow.com/c/niche/images/s/61e5822e-3497-481d-bc66-ab664e2a0073.png


I need to make a simple checkbox for the co-branded scholarships... Should I be using pre-built form components, or should I be building a simple input from scratch?

#### Answer _by Spencer Kingman_

Ultimately I tried to make it both ways. The winner was the custom built checkbox, because I was unsure how to go about just using the `CheckboxGroup` without creating a whole form. There are forms that just have one field, like reset password, and that would have been fine, but it also seemed like if I created a new form, I would need a special button that tied into the `form-submit-action`. I didn't want to modify the `Apply Now` button that already exists here, so I just used the custom checkbox solution.

#### Answer _by Kim Cooperrider_

Gah, tricky. 

It's kinda a grey area when it comes to the simple forms like this one.. I'd say though maybe spend some time in the existing forms code - maybe like a timeboxed 20-30 minutes? - trying to get a feel for whether or not the existing setup will be more in your way here than useful, since that'd be a sign to roll your own, plus more eyes in the forms code will be a good thing IMO. Another thing to consider is whether or not this form could become more complex over time, since that would lend itself to the argument for using existing forms code.

I would try to use at least the base input components that we already have though, like Checkbox, if that's at all possible, because if we start having many one-off checkbox components, it will be difficult to track if/when they begin to diverge over time, plus it'll be harder to change/know where to change if design ever wants a global checkbox style update.

***

## How are entity profiles updated?

When there need to be changes to profile layouts or how the data the front end receives is structured, how does this happen? Who is involved and what are the processes?

#### Answer _by Stella Chung_

This is a thorough description by Rebecca: https://github.com/nicheinc/wiki/wiki/FEAT---Profiles

> It's entirely data driven, at this point. The profile service just looks at the data provided and serves that up to the FE. Data and Product (and FE if there are new templates) can change virtually anything about profiles without BE involvement

***

## Non-interaction events in GA

How do I use/setup a non-interaction event in Google Analytics?

#### Answer _by Brendan Murray_

You want to set a key/value of `nonInteraction: true` on the event.

Here's an example of one of the events:

    Show: {
        id: 'Show',
        category: 'Experiment',
        nonInteraction: true,
        label: labelConcat,
    },

That tag is defined here: https://github.com/nicheinc/Website/blob/dev/common/analytics-action-types.js#L431

You can find where that key is sent into dataLayer here: https://github.com/nicheinc/Website/blob/dev/common/utils/analytics-actions.js#L44

Here is where it is represented in the dataLayer push:
https://user-images.githubusercontent.com/20906544/45509904-c7b6e700-b766-11e8-84ed-208369d5f3fd.png

***

## 5830 machine for IE testing

How do I use the 5830 machine to check things out in IE?

#### Answer _by Brendan Murray_

First install: https://itunes.apple.com/us/app/microsoft-remote-desktop-10/id1295203466

The machine name is `ws-5830`. When asked for a user, use what you would log in with to the Niche network.

https://user-images.githubusercontent.com/20906544/45570800-05cd0d00-b832-11e8-9cbb-4377c0863fb2.png

Note: only one person can be connected to the machine at a time; it may be busy around the time of the MDU

***

## Can I lookup user-guid from email address? (#front-end)

When a user unsubscribes from mailchimp, our api is called in `server/api/mail.js`:
    
    async function _processPost(req, res) {


That `req` body looks like this: 

    {
        "email": "jgriffith+test1@niche.com",
        "listId": "123456"
    }

I need to update the user profile in the account service, but all of those account service methods take userGuid as parameter.

#### Answer _by Spencer Kingman_

The req body posted above is actually wrong. That is for the ole mail services. This, on the other hand, concerns an endpoint that mailchimp hits every time someone unsubscribes from one of their emails. Joel informed me that the USERGUID is actually a merge field in the emails and, as such, will be delivered as part of the `req` thus:

    req.data[merges][USERGUID] 

***

## Fallback image when `background-image` fails to retrieve an image?

In several places in Website, we display an image by using the CSS property:
```
background-image: url(<url-to-my-image>);
```

But what if this fails? For example, in Profile pages, the header image url is supplied by data. If the url is malformed or something is wrong with the server so that it fails to send an image file, we'll just see an ugly blank white space where the image was supposed to be!

#### Answer _by Josh Smith_

In addition to your answer at https://stackoverflow.com/c/niche/a/40/3, it looks like https://stackoverflow.com/questions/37588017/fallback-background-image-if-default-doesnt-exist might also work.

> You can use multiple backgrounds if there is no transparency involved and they occupy all available space or have the same size:
>
>     div{   
>         background-image: url('http://placehold.it/1000x1000'), url('http://placehold.it/500x500');
>         background-repeat:no-repeat;
>         background-size: 100%;
>         height:200px;
>         width:200px;
>     }

So in the Profile header case, if that's coming in through the data and handled in the component, maybe the `background-image` style would be a string like `'url(data-driven-url.jpg), url(backup-url-that-we-most-likely-have-access-to.jpg)'`. And then having the `background-color` as the backup backup in case we can't access our fallback image. ¯\\_(ツ)_/¯, but definitely worth talking out with FE/Design.

#### Answer _by Stella Chung_

The most straightforward fix for this is to use a `background-color` property. This property, as described by [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/background-color) is rendered behind `background-image`. MDN docs [recommend](https://developer.mozilla.org/en-US/docs/Web/CSS/background-image) specifying a `background-color` as a fallback for the event where a `background-image` fails to load.

```
background-image: url(<url-to-my-image>);
background-color: @green05;
```

Note that you cannot use something like `background: linear-gradient(...)` since that is also of type `image`, and will be overwritten by the property `background-image`, instead of displaying behind it.

***

## How do I mock an imported module in Jest?

You can see in the component that I am importing a SplashScreen from the package `react-native-splash-screen`. I am calling its `.hide()` method on `componentDidMount()`.

    import React from 'react'
    import { Text, View } from 'react-native'
    import SplashScreen from 'react-native-splash-screen'
    import styles from './styles'

    export default class Auth extends React.Component {
        public componentDidMount() {
            SplashScreen.hide()
        }

        public render() {
            return (
                <View style={styles.container}>
                    <Text>Loading...</Text>
                </View>
            )
        }
    }

How do I mock the imported module so that my snapshot test can pass?


#### Answer _by Spencer Kingman_

I used the `jest.mock()` API. Here is the test file.


    import React from 'react'
    import 'react-native'
    import renderer from 'react-test-renderer'
    import Auth from '../Auth'

    jest.mock('react-native-splash-screen', () => ({
        hide: () => {},
    }))

    jest.useFakeTimers()

    it('renders correctly', () => {
        const tree = renderer.create(<Auth />).toJSON()
        expect(tree).toMatchSnapshot()
    })


***

## How do you use module aliases in a JS or Typescript project using Babel?

Module aliasing refers to using absolute vs relative paths in file imports. For example:

    // ugly relative path
    import { books } from '../../../../../components/common/library'
    
    vs
    
    // much better
    import { books } from 'components/common/library'



#### Answer _by Stella Chung_

In JS only projects, we can use the babel plugin `module-resolver`

1. `npm i --save-dev babel-plugin-module-resolver`
2. Modify the `.babelrc` to something like:

        "plugins": [
        [
            "module-resolver",
            {
                "root": ["./"],
                "alias": {
                    "boot/*": ["./src/boot"],
                    "reducers/*": ["./src/reducers"],
                    "screens/*": ["./src/screens"],
                    "styles/*": ["./src/styles"],
                    "types/*": ["./src/types"]
                }
            }]

In TypeScript projects, you also need to let the TS compiler know how to resolve these modules. In the `tsconfig.js`, write something like:

    "compilerOptions": {
      "moduleResolution: "node",
      "baseUrl": "./src",
      "paths": {
            "boot/*": ["boot/*"],
            "reducers/*": ["reducers/*"],
            "screens/*": ["screens/*"],
            "styles/*": ["styles/*"],
            "types/*": ["types/*"]
        }

You ALSO need to let `ts-jest` know! Full documentation is [here][1]. But in your `jest.config.js` file add this:

        moduleNameMapper: {
        '^boot/(.*)$': '<rootDir>/src/boot/$1',
        '^reducers/(.*)$': '<rootDir>/src/reducers/$1',
        '^screens/(.*)$': '<rootDir>/src/screens/$1',
        '^styles/(.*)$': '<rootDir>/src/styles/$1',
        '^types/(.*)$': '<rootDir>/src/types/$1',
    },


  [1]: https://kulshekhar.github.io/ts-jest/user/config/#paths-mapping

***

## How do I add an SVG image to a react-native App?

How do I add an SVG image to a react-native App?

#### Answer _by Spencer Kingman_

We are utilizing the `react-native-svg` package. https://github.com/react-native-community/react-native-svg

To add SVG images:

1. Design must export their Illustrator file with no `<script>` tags that store css for colors. The colors need to be inlined into the `fill` property. _(This is different than the .svgs we have on Website)_
2. Convert the `.svg` to a react-native component. Here are two methods:
    **a.** Use the online svgr tool at https://svgr.now.sh/ to transform the SVG into JSX (Really TSX for our purposes)
    **b.** Install the [svgr tool](https://github.com/smooth-code/svgr), then run the file through it with a command like  `npx @svgr/cli -d ./svgr --native platform-sprite.svg`

3. Change `props` to `(props: any)` to satisfy the TypeScript compiler (at least until we write more specific type checking).


**WARNING** When I used the above method on `NicheTown.svg`, it generated a `.tsx` file that cut off the top of the image.

<img width="385" alt="screen shot 2018-10-03 at 4 02 16 pm" src="https://user-images.githubusercontent.com/31008961/46488340-61a30a00-c7d0-11e8-8617-badd96021ddb.png">

In the svg code, there was a `<Defs>` component with several `<ClipPaths>`. When I deleted the `<Defs>` component, along with its children, the image rendered correctly. I do not know why this happened or if it will happen consistently with other .svgs, but I wanted to document it.  

***

## Trying to run jest on the app fails with `Native module cannot be null`

I made some changes on the react-native app and tried to run jest. I received an error: 

    Test suite failed to run
    Invariant Violation: Native module cannot be null

The stacktrace involved a new package that I had installed in my commit `react-native-safari-view`. 

#### Answer _by Spencer Kingman_

The solution was:

Create a `jest-setup.js` file.

Add the setup file to the `jest` config (may be in `package.json`).

    "jest": {
        // ...
        "setupFiles": [
            "<rootDir>/jest-setup.js"
        ],
        // ...
    }

And then mock the package in `test-setup.js`:

    jest.mock('react-native-safari-view', () => {
        show: () => {},
    }))

#### Answer _by Josh Smith_

No personal experience with that module, but this may help?
https://github.com/naoufal/react-native-safari-view/issues/99#issuecomment-403133475

> You need to mock this lib too in your `jest/setup.js` file just like
> you're doing for `Linking`
> 
>     jest.mock('react-native-safari-view', () => ({   show: () => {}, }))



***

## How do you turn off the iPhone X simulator?

With most of the iPhone/iPad simulators, you can "hold down" the power button by click and hold with your mouse. After a few seconds, the power off slider appears.

BUT, iPhone X's are shutdown by holding two buttons down at the same time. How does one do this with a mouse? Is there another way to close the simulator in a situation where I have more than one simulator running and I can't just Quit the application? 

#### Answer _by Spencer Kingman_

This wasn't exactly an easy thing to find online or by poking around xCode, but the way that I have found to close this particular simulator is to go to the `Window` menu and turn off `Show Device Bezels`. This turns the simulator into a normal window with a close button.

EDIT: Whether the bezels are there or not, the simulator is just a window, so... You can close it with Cmd + W.

***

## How do I make the react-native yellow box warning a different color?

The yellow background makes the output of `console.warn()` unreadable! Check it out.


[![enter image description here][1]][1]

  [1]: https://stackoverflow.com/c/niche/images/s/97c56017-3801-4b09-b872-8b368066678e.png

#### Answer _by Spencer Kingman_

Edit the pertinent file in terminal:

`vim node_modules/react-native/Libraries/YellowBox/UI/YellowBoxStyle.js`


Change the BackgroundColor and the HighlightColor to something darker.


    const YellowBoxStyle = {
      getBackgroundColor(opacity: number): string {
        return `rgba(250, 186, 48, ${opacity})`;
      },

      getDividerColor(opacity: number): string {
        return `rgba(255, 255, 255, ${opacity})`;
      },

      getHighlightColor(opacity: number): string {
        return `rgba(252, 176, 29, ${opacity})`;
      },

      getTextColor(opacity: number): string {
        return `rgba(255, 255, 255, ${opacity})`;
      },
    };


Then, rebundle with `npm run start:clean`

***

## What is up with our RNN and RN versions right now?

Why are we holding RNN at 2.0582 when there are significant bugs in it that have been resolved by later versions?


#### Answer _by Spencer Kingman_

**THIS ANSWER IS DEPRECATED AS OF Dec 2018** 

We are holding RNN at 2.0.2582 right now because we have a working installation alongside RN 57, even though RNN doesn't officially support RN 57 yet (see here: https://github.com/wix/react-native-navigation/issues/4257). If we upgraded to the latest (2.0.636, as of this writing), it builds nicely, but there are `android:lint` errors that will not make it through Travis. However, the newer versions of RNN fix several pertinent bugs, and iOS performance is noticably better. So... if you are working on a branch, it is suggested to install latest RNN for your work, but downgrade back to 2.0.2582 for github/travis. This is not the most awesome solution, but it will get us by until RNN has more mature support for RN 57 (or 58 or whatever...).

Why, you may ask, do we care about staying with RN57? Well, originally we tried it out because Liz was on windows, and RN56 has issues with windows builds. She is on Mac now, but we already had a working RN57 setup. RN57 has a WebKit WebView, which Stella is currently doing a lot of work with. We could have rolled back to RN56 and installed a WebKit WebView separately, but Stella and I (SK) preferred this way.

#### Answer _by Spencer Kingman_

We thought we were going to have to wait for RN 58 to solve a lot of the riddles with our dependency conflicts, but RN 57.5 + RNN 2.1.3 + Babel 7 is a winning combo, and everything seems to run really well.


***

## How do I fix import errors in AndroidStudio?

Sometimes when you look at a file in Android Studio, there are errors about imports and resolving and unknown methods. These errors might break your build, or they may seem to have no effect. How do I address them?

#### Answer _by Spencer Kingman_

If you have imported a dependency, but are seeing an error in AndroidStudio that the dependency is not recognized as installed, here are some things to consider:

 - `Android Studio --> Preferences --> Editor --> General --> Auto-Import --> Add unambiguous imports on the fly`. You probably want to turn that on. It automatically tries to resolve dependencies as you type. And some documentation online assumes that you have it turned on (i.e. the documentation doesn't explicitly tell you what to import).

 - Sometimes, the above does not work, for some reason. In these cases, you will probably see a message at the top of AndroidStudio saying that `files have been updated, do you want to perform gradle sync...` or something close to that. Sometimes performing the gradle sync will resolve the dependencies.

 - If you are seeing that many imports are unresolved in `Android Studio` and there are errors all over the place, but nonetheless, your build still seems fine... then you probably edited some android code in a different editor. Android Studio gets very confused by this. The only way I have found to resolve this is `File --> Invalidate Caches/Restart --> Invalidate and Restart`.

***

## How do I see the frickin' logs/lints in AndroidStudio?

Why do I see a different log if I run `Build` in AndroidStudio or `react-native run-android` in a terminal? 

ALSO: What are all of these unlabeled/ambiguously labeled buttons in AndroidStudio?

ALSO: How can I lint the code without going to the command line or waiting for travis?

#### Answer _by Spencer Kingman_

The Run tab shows logs for the running app. You'll notice you can see the redux state in there, and that can be pretty nice.

[![Run tab][1]][1]

The Build tab automatically pops up, and, for a while, I didn't know how to see more helpful info. The build tab is sort of like a plain-english top-level summary of how a build/clean/make/run/sync process is going. It can be somewhat useful, and if you have the `Sync` pane open (the little tab looking thing up and to the left), then you can get slightly more specific messaging about build issues.

[![Build tab][2]][2]


However, the most useful part of the Build logs is hidden. In order to see the same type of logs that you can see in the terminal from running `react-native run-android`, you have to click this confusing little unlabeled button.

[![Log button][3]][3]


[![terminal logs][4]][4]

Another type of log that I have used is the device log, which you can see by clicking the `Logcat` tab.

[![enter image description here][5]][5]

You may also want run the linter in AndroidStudio. You can lint code with `gradlew lint` command, or you can wait to see if linter errors show up in Travis, but... if you want to run the linter in AndroidStudio, it is not obvious how to do this. There is no option called `Lint` in any of the menus. 

To run the linter go to `Analyze --> Inspect Code`. Once you have done this the results are available in the `Inspection Results` tab.

[![enter image description here][6]][6]


  [1]: https://stackoverflow.com/c/niche/images/s/59f60e5c-ab4c-4784-8156-973014accd34.png
  [2]: https://stackoverflow.com/c/niche/images/s/ac52a4fd-350c-4892-af30-0af22d45186a.png
  [3]: https://stackoverflow.com/c/niche/images/s/29a78760-3f6a-421f-b396-46db46d3c7c8.png
  [4]: https://stackoverflow.com/c/niche/images/s/1e007c6e-b7a2-4f82-b808-c27e9e33dbe4.png
  [5]: https://stackoverflow.com/c/niche/images/s/b0107770-cde9-4286-9433-1a6575b4475f.png
  [6]: https://stackoverflow.com/c/niche/images/s/acd4f09d-674c-4ece-b357-883191be9bb4.png

***

## How do I check environment variables in react native?

How do I check environment variables in react native? Or if I'm in a dev environment?

#### Answer _by Stella Chung_

You can use the global variable `__DEV__` to check if you are in a dev environment. For other environment variables, you can access them via `react-native-config`

See https://github.com/nicheinc/wiki/wiki/APP---Env-Config#specifying-environments-in-react-native

***

## What VS Code extensions do you recommend for ReactNative with TypeScript?

What are the best extensions for VS Code? VS Code is recommended by Stella and I for anyone working with TypeScript, because the the typescript errors and hints are built-in. 

#### Answer _by Spencer Kingman_

I use mostly the same as Stella. I also have:

- Path Intellisense (instead of Path AutoComplete listed above)
- Sublime Text Keymap and Settings Importer
- Vim (for keybindings, actually works, unlike actualvim for Sublime)
- Auto Complete Tag
- Babel JavaScript (for syntax highlighting)
- Custom CSS and JS loader (for tree lines in the Explorer side pane)
- DotENV (for syntax highlighting in .env files)
- ESLint
- Open File from Path
- Paste JSON as Code (auto strong-typing)
- (Also some color themes)


#### Answer _by Stella Chung_

For app:

 * CodeMetrics - computes code complexity
 - Color Highlight - highlight web colors in your editor
 - Jest - jest plugin
 - React Native Tools - Code hinting, debugging, integrated commands
 - TSLint - plugin


In general:

* Gitlens
- npm - npm support
- npm intellisense - autocompletes npm modules in import statements
- Path Autocomplete - path completion
- Prettier - VS Code plugin for prettier
- stylelint - plugin
- svg viewer
- TODO Highlight - highlights todo
- vscode-icons
- HTML CSS Support
- IntelliSense for CSS class names in HTML
- Bracket Pair Colorizer

You can automatically sync to my settings using [Settings Sync](https://marketplace.visualstudio.com/items?itemName=Shan.code-settings-sync) (requires some installation steps)
https://gist.github.com/schung-niche/387206bdd7a09ee8e771b4f9dea0b4f7

Or just download via the Extensions menu in vscode

***

## How do I change the Platform for react-native unit tests?

I have a unit test for a function. It has platform-specific behavior. What do I do?

#### Answer _by Spencer Kingman_

By default, in `jest`, `Platform.OS === 'ios'`.

To change it to Android in a unit test, you can write: `Platform.OS = 'android'`

It appears to be that easy.

***

## How to re-mock a mocked module in jest tests?

I am unit testing a component that imports 'react-native-branch'. I know how to mock the module in my `jest-setup.js`: 

    jest.mock('react-native-branch', () => {
        return {
            subscribe: (cb: any) => {
                cb({ params: { '+clicked_branch_link': false }, error: null })
            },
        }
    })

However, the `subscribe` method can return different params and error states, and I need to test them all.

I can manually change the mock, and test each case one test-run at a time, but I need a way to overwrite or re-mock the module on a test-by-test basis that can flow with my automated jest testing.

How can this be done?

#### Answer _by Spencer Kingman_

The only way I could find to do it was to move the mock from `jest-setup.js` to four different test files (I have four different contingencies to test)

In each of these test files, I define the return from the `subscribe` method as needed.

[![enter image description here][1]][1] 

[![enter image description here][2]][2]


  [1]: https://stackoverflow.com/c/niche/images/s/f3c49516-ba45-4fa1-ae1f-9dde1ba93570.png
  [2]: https://stackoverflow.com/c/niche/images/s/dee7ac5b-dcc8-4277-b432-2d8607bd47d0.png

***

## How do I run the services locally with docker?

I want to get docker working on my computer. I have downloaded and installed from here: https://runnable.com/docker/install-docker-on-macos

What should I do next?


#### Answer _by Spencer Kingman_

Looks like the relevant documentation is here: https://github.com/nicheinc/development

And it looks like I installed from the wrong source, too.

***

## How do we prevent the user from clicking fast and pushing multiple duplicate screens in the app?

When the user pushes a screen to the top of the navigation stack, that new screen slides into place over the course of about 200ms. If the user is fast, they can press the button multiple times before it is obscured. This pushes multiple instances of the same screen on to the stack.

#### Answer _by Spencer Kingman_

The solution in the app uses the `debounce` method from `lodash`. I imagine we will have to wrap all of our `Navigation.push` actions in this.

I didn't want to use the whole lodash package, and the `debounce` part of lodash seemed pretty stable, so I used `lodash-cli` to create a custom build of lodash that only includes `debounce`. The outputed code is in the `src/utils/debounceUtils/` dir, not in `node_modules`. It is a 1k file.

You can import it like this:

`import { debounce } from 'utils/DebounceUtils/lodash.custom.min.js'`

And you can use it on a press handler like this:

    <Text
        onPress={
            debounce(
                this.handlePress,
                500, 
                { 
                    leading: true, 
                    trailing: false 
                }
            )
        }
    >
        Submit
    </Text>

The first argument is the function you want to keep from repeating. The second argument is the duration of the buffer (500ms here). The third argument tells the debounce method that you want the function to be called once on the first press event of a group, and not to be called 500ms after the last event of a group. 

***

## Hit passwordReset endpoint from app, I get the email, follow the link to resetPassword on website, but then it errors on submit

When I hit this endpoint from the app in a reset password flow: https://github.com/nicheinc/Website/blob/dev/routes/account-routes.js#L76

I get the email, I follow the link, but I can't actually change my password.

I assume there is supposed to be a token in the query string, but I don't have any query parameters on my request.

#### Answer _by Spencer Kingman_

See example post request body for `/passwordReset`

    {
        "email":"dude@niche.com",
        "resetUrl":"nathancochran.info",
        "tokenExpMins":30
    }

`resetUrl` should probably be in `.env`, and in `dev`, it should point to the local machine `localhost:3000/account/passwordreset/perform/`

I had the resetUrl set like this:

    export const WEBSITE_PASSWORD_RESET_ROUTE = 'http://www.niche.com/account/passwordReset/perform'
and the url I got on the link in my email looked like this: 
“http://www.niche.com/account/passwordReset/perform?token=eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJuaWNoZS5jb20iLCJleHAiOjE1NDc3MzExNDEsImlhdCI6MTU0NzY0NDc0MSwic3ViIjoiZWMwYjc3NzAtNGMxOC00NWQzLWEyYjctNzRlZTZmYmFkYjg3Iiwic2NvcGUiOiJwYXNzd29yZC1yZXNldCJ9.P5y54fiFRdFKA8f1H0Oe2T9les5bXNG7BFh9o4RZYZzV8Tm91LewtP7L1s8yFgSVaew3Z8BM-v-71R8pTtujEm9kUD8D63Ny7rSE84XF3tIdvtDQ4etXEMbc0Yytk31uf1coQetrspXvsB0GdmiXPrBiCjVlJr4-NceppXW2tfU” That is what the url looked like from the link in the email

But that URL would be talking to the prod db, where the user may not actually exist, or even if it does, the guids might not match, and the guid will be encoded in the token. Also, the token that's generated in dev won't be valid in prod due to the different keys.

***

## From the standpoint of buildURL(), what are all of the possible verticals?

`buildURL()` can take the four verticals proper, 'home', 'account', or ''. Is there anything else that is a valid "vertical" in the way we use it in urlBuilder.js?

Also, if these things that are not really verticals can be arguments to the vertical param in `buildURL()` should we rename that param?

#### Answer _by Josh Smith_

`"home"` and `"account"` _should_ be the only outliers used in `buildURL()` as verticals. 

They're present there mainly for historical reasons, when verticals were at specific subdomains of `niche.com`, but there was also the case of no subdomain (`"home"`) and the subdomain for all user account activity (`"account"`). A better name for them (at that point of time) would probably have been "subdomains", although `"home"` still would have been an outlier.

EDIT

This has been a longstanding issue, to clean up the conflation of "verticals" and historical "subdomains" https://github.com/orgs/nicheinc/projects/5#card-1909533

I'm all for renaming it to be more accurate to the content, but not sure what would work best. Throwing out some ideas.

- `pathBase`
- `pathPrefix`
- `siteSection`
- `siteDomain`

I'm totally open for others though, too.

**EDIT:** I added a comment to `buildURL` that clarifies what it currently accepts as a `vertical` and address the tech debt to rename it with a `// TODO` https://github.com/nicheinc/Website/commit/a46150393f8a164d85fee63ed9549324718f4d32

***

## How can I get my imports to auto-sort to please tslint?

In vscode there is a nice auto-import function. You start typing something. Vs Code guesses what you need and offers to Auto-import with a click: [![enter image description here][1]][1]


  [1]: https://stackoverflow.com/c/niche/images/s/29a1868d-0255-4a9b-9bc0-1d6e9794d54c.png

However, the auto-import just adds it to the end of your dependencies. Our tslint config demands that all imports are alphabetized within their groups, and that all named imports be alphabetized. How can I get automate this?




#### Answer _by Spencer Kingman_

I use this one now, for website and app... https://marketplace.visualstudio.com/items?itemName=mike-co.import-sorter

With the following settings.json in vscode:

    "importSorter.generalConfiguration.sortOnBeforeSave": true,
    "importSorter.importStringConfiguration.hasSemicolon": false,
    "typescript.updateImportsOnFileMove.enabled": "always",

#### Answer _by Spencer Kingman_

You can use the following extension with the following config lines added to your `Settings.json` (Edit by Cmd + Shift + P: `Preferences: Open Settings (JSON)`) 

[![enter image description here][1]][1]


  [1]: https://stackoverflow.com/c/niche/images/s/37900218-7a3c-4eb1-a930-f51e78ee6e34.png

    "typescript.extension.sortImports.enableJavascript": true,
    "typescript.extension.sortImports.omitSemicolon": true,
    "typescript.extension.sortImports.sortMethod": "path",
    "typescript.extension.sortImports.sortOnSave": true,
    "typescript.extension.sortImports.pathSortOrder": [
       "package",
       "relativeDownLevel",
       "relativeUpLevel",
    ]

***

## Do we have a standard hack for making sure that `window` is defined before referencing it in server-side react code?

Do we have a standard hack for making sure that `window` is defined before referencing it in server-side react code?

Seems like I have seen this in website.

#### Answer _by Brendan Murray_

Just saw this in one of Josh's PRs yesterday: https://github.com/nicheinc/Website/pull/4185/files#diff-532f25c13b07a67954363b172a792789R5

#### Answer _by Spencer Kingman_

Often like this:  `if (typeof window !== 'undefined') {`

***

## Why do we keep 4 entities in the cookie, but only display 3?

Why do we keep 4 entities in the cookie, but only display 3?

#### Answer _by Brendan Murray_

Here's a comment in our code that explains it: 

```
// Note: due to the way we hide the current profile from users, 
// this number is actually 1 higher than what is rendered
// On non profile pages, users see [0,1,2]
// On profile pages, users see [1,2,3]
```

https://github.com/nicheinc/Website/blob/dev/common/constants/view-queue/view-queue.js#L1-L3

If we remove the first item from the array, we still want up to 3 to show, so we make the max 4. On a page where no item is removed from the front, if we have more than 3 items, we trim the end of the array. This way we can always show the user up to 3 relevant items.

One more thing: seeing as how we have more real estate in the full screen sherlock in the app, we could increase the limit on the cookie to show more in the app and limit the FE in website to display 3 in the component.

***

## How do I eliminate the noise from the XCode console?

How do I prevent an endless stream of 

    nw_socket_handle_socket_event [C50.1:1] Socket SO_ERROR [61: Connection refused]

in the XCode logs?

[![XCode log noise][1]][1]


  [1]: https://stackoverflow.com/c/niche/images/s/e9253cc3-0140-481a-85ca-c3cde3a7a5ca.png

#### Answer _by Spencer Kingman_

Go to the Product menu: `Product > Scheme > Edit Scheme`

Add an environment variable in `Run > Arguments`

Add name: `OS_ACTIVITY_MODE`

Add value: `disable`

(Actually you probably won't have to do this, because it will be committed to version control.)

[![Edit Scheme][1]][1]


  [1]: https://stackoverflow.com/c/niche/images/s/a1e82d85-fe17-4b59-866e-68bf0a7e60f4.png

***

## Why isn't `newrelic` in our Website `node_modules`?

While trying to upgrade to Babel 7, I try to run the `__build:server:docker` script, and I get an error:

    ERROR in ./server/server.js
    Module not found: Error: Can't resolve 'newrelic' in 
    '/Users/skingman/projects/Website/server'
    @ ./server/server.js 13:4-23


In `server/server.js` we have:

    if (['production', 'pre-stage', 'stage'].includes(process.env.NODE_ENV)) {
        require('newrelic')
    }

Does that error happen because `newrelic` isn't in our `/node_modules/`? And if so why isn't it?

#### Answer _by Josh Smith_

https://github.com/nicheinc/Website/pull/3694

It seems (at least at the time) that it was omitted from the `package.json` because it was a platform-dependent install. We didn't want developers on Windows to run into issues with the `newrelic` package, so we only install it in environments that we know won't be Windows (e.g. prod, pre-stage, stage, etc.). 

I believe adding `'docker'` to that array in `server/server.js` should resolve that error.

#### Answer _by Spencer Kingman_

We install it in travis flow after an OS check. So, I just installed it locally for testing my webpack configs, but I won't commit the `package.json`.

***

## What is the etiologicalRemnant?

https://github.com/nicheinc/Website/blob/dev/server/api/account.js#L214-226

I believe that when a user logs in, their temp backpack entities are converted into normal account backpack entities, and these get harvested for potential leads.

It looks like some of them might end up with a PENDING leadStatus, and these are catalogued in a cookie called `etiologicalRemnant`. 

What is it for? And what does it all mean?

#### Answer _by Shawn Rancatore_

Lead origin is a way for us to keep track of what a user's context was when they add an entity to their backpack. 
If a user is logged in, then the lead origin is sent with the lead immediately when the entity is added to their backpack.  
If, however, the user is not logged in, the entity will be added to the temporary backpack.  The temporary backpack allows for recording the lead origin of items within it and so when it is finally upgraded to a real backpack(when the user registers), leads are generated for each item in the temp backpack and those include the lead origin.

Sometimes users add items to their temp backpack that require the user to opt into additional agreements/terms.  Such a temp backpack item can be imported into the backpack upon registration BUT it can't be sent as a lead until the user completes some action. 

Since the backpack does not allow for recording the lead origin of the addition of an entity, this leaves the story of the origin of these would-be leads in the lurch. 

The `etiologicalRemnant` cookie is a place where we can store the lead origin of backpack items until the user has satisfied the requirements for that entity to count as a lead.

***

## What is the difference between `_new_tb` and `_tb` when it comes to lead origin suffixes?

We have a `NEW_TEMPORARY_BACKPACK` suffix and a `USER_TEMPORARY_BACKPACK` suffix, but I am not sure what the distinction is there.

https://github.com/nicheinc/Website/blob/dev/common/constants/user/lead.js#L26

#### Answer _by Josh Smith_

[Brendan](https://stackoverflow.com/c/niche/users/7/) said this in person, but for posterity, I believe it differentiates users who log in and users who register when they have a temporary backpack.

Also, https://github.com/nicheinc/Website/commit/8adadeb4118445e54d35e1a42c9f73b089131543

***

## How do we decide whether or not to setNoCacheHeader(res) when creating an api endpoint?

In `api/backpack.js`, I notice that when we import the backpack we don't call this method, but on the other endpoints we do.

***

## What is the proper way for us to log error with `niche-logger`?

Which is best?

A

            } catch (err) {
                NicheLog.error('[blah-blah api]', err)
            }
B

            } catch (err) {
                NicheLog.error('[blah-blah api]', JSON.stringify(err))
            }

C

            } catch (err) {
                NicheLog.error('[blah-blah api]', err.stack)
            }
D

            } catch (err) {
                NicheLog.error('[blah-blah api]', ??Something Else??)
            }

