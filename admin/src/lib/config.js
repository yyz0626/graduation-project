export const dataList = [{
        postsId: 1,
        title: '啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊',
        textType: 1,
        author: '驱蚊器',
        bgUrl: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fi0.hdslb.com%2Fbfs%2Farticle%2F10b29b8e5f9aa60d68b29d1679e125e399e0d3cd.jpg&refer=http%3A%2F%2Fi0.hdslb.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1647264897&t=8bb3683dee0449403d7a7b421270da2b',
        date: '2022-55-55'
    },
    {
        postsId: 2,
        title: '踩踩踩踩踩踩踩踩踩踩踩踩踩踩踩踩踩踩从',
        textType: 2,
        author: '跌跌撞撞',
        bgUrl: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fi0.hdslb.com%2Fbfs%2Farticle%2F10b29b8e5f9aa60d68b29d1679e125e399e0d3cd.jpg&refer=http%3A%2F%2Fi0.hdslb.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1647264897&t=8bb3683dee0449403d7a7b421270da2b',
        date: '2022-5115-55'
    },
    {
        postsId: 3,
        title: '踩踩踩踩踩踩踩踩踩踩踩踩踩踩踩踩踩踩从',
        textType: 2,
        author: '跌跌撞撞',
        bgUrl: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fi0.hdslb.com%2Fbfs%2Farticle%2F10b29b8e5f9aa60d68b29d1679e125e399e0d3cd.jpg&refer=http%3A%2F%2Fi0.hdslb.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1647264897&t=8bb3683dee0449403d7a7b421270da2b',
        date: '2022-5115-55'
    },
    {
        postsId: 4,
        title: '踩踩踩踩踩踩踩踩踩踩踩踩踩踩踩踩踩踩从',
        textType: 2,
        author: '跌跌撞撞',
        bgUrl: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fi0.hdslb.com%2Fbfs%2Farticle%2F10b29b8e5f9aa60d68b29d1679e125e399e0d3cd.jpg&refer=http%3A%2F%2Fi0.hdslb.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1647264897&t=8bb3683dee0449403d7a7b421270da2b',
        date: '2022-5115-55'
    },
    {
        postsId: 5,
        title: '踩踩踩踩踩踩踩踩踩踩踩踩踩踩踩踩踩踩从',
        textType: 2,
        author: '跌跌撞撞',
        bgUrl: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fi0.hdslb.com%2Fbfs%2Farticle%2F10b29b8e5f9aa60d68b29d1679e125e399e0d3cd.jpg&refer=http%3A%2F%2Fi0.hdslb.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1647264897&t=8bb3683dee0449403d7a7b421270da2b',
        date: '2022-5115-55'
    }
]
export function checkTextType(type) {
    const map = {
        1: '难题解答',
        2: '交友平台',
        3: '二手市场',
        4: '休闲娱乐'
    }
    return map[type]
}
export function checkTextTypeByEnglish(type) {
    const map = {
        1: 'questions',
        2: 'friends',
        3: 'auction',
        4: 'entertainment'
    }
    return map[type]
}