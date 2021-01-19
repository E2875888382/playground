import {get} from '../base';

// 获取小说源
export const booksSource = async booksId=> {
    return get({
        url: 'http://api.zhuishushenqi.com/atoc',
        params: {
            view: 'summary',
            book: booksId
        }
    })
}

// 根据源id获取章节
export const booksChapters = async sourceId=> {
    return get({
        url: `http://api.zhuishushenqi.com/atoc/${sourceId}`,
        params: {
            view: 'chapters'
        }
    })
}

// 获取章节内容
export const booksChaptersContent = async chapterlink=> {
    return get({
        url: `http://chapterup.zhuishushenqi.com/chapter/${encodeURIComponent(chapterlink)}`
    })
}