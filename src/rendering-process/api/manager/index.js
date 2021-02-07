import * as books from '../books';
import * as booksRanking from '../books/ranking';
import * as booksCats from '../books/cats';
import * as booksDetail from '../books/detail';
import * as booksChapters from '../books/chapters';
import * as booksSearch from '../books/search';
import * as street from '../street';
import * as webview from '../link';
import * as pictures from '../pictures';

// 全局管理api，通过provide注入
export default {
    books,
    booksRanking,
    booksCats,
    booksDetail,
    street,
    booksChapters,
    booksSearch,
    webview,
    pictures
}