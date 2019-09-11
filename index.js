const fs = require('fs');

const posts = require('./niche-stackoverflow/posts.json')
const users = require('./niche-stackoverflow/users.json')

const createUsersLookup = () => {
    let usersLookup = {
        "-1": "StackOverflow"
    }
    users.forEach(user => {
        usersLookup[user.id] = {
            name: user.displayName
        }
    })
    return usersLookup
}

const processPosts = async () => {
    const usersLookup = createUsersLookup()

    const processedPosts = await posts.map(post => {
        const newId = post.postType === 'question' ? post.id : post.parentId + 0.1
        const author = usersLookup[post.ownerUserId].name
        // const author = 'me'
        const title = post.postType === 'question' ? `***\n\n## ${post.title}` : `#### Answer _by ${author}_`
        return {
            id: newId,
            title,
            bodyMarkdown: post.bodyMarkdown
        }
    })

    const relevantPosts = processedPosts.splice(10)

    const sortedPosts = relevantPosts.sort((postA, postB) => {
        return postA.id - postB.id
    })

    let markdownPosts = ''

    sortedPosts.forEach(post => {
        markdownPosts += post.title
        markdownPosts += '\n\n'
        markdownPosts += post.bodyMarkdown
        markdownPosts += '\n\n'
    })

    // console.log(markdownPosts)

    fs.writeFile("./stack-overflow-posts.md", markdownPosts, function (err) {
        if (err) {
            return console.log(err);
        }

        console.log("The file was saved!");
    });
};

processPosts()