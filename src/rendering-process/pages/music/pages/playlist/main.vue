<template>
    <div v-if="data.code && data.code === 200">
        <div class="playlist-header">
            <el-image class="playlist__cover" :src="data.playlist.coverImgUrl + '?param=230y230'" alt="" fit="fit">
                <template #placeholder>
                    <div class="image-slot">
                        <i class="el-icon-picture-outline"></i>
                    </div>
                </template>
            </el-image>
            <div class="playlist__des">
                <h2 class="align-center playlist__name">
                    <el-tag type="danger" effect="plain">歌单</el-tag>
                    <span class="playlist__nameContent">{{data.playlist.name}}</span>
                </h2>
                <div class="playlist__creator">
                    <el-avatar :size="30" :src="data.playlist.creator.avatarUrl" />
                    <span class="playlist__creatorName">{{data.playlist.creator.nickname}}</span>
                    <span class="playlist__createTime">{{getDate(data.playlist.createTime)}}创建</span>
                </div>
                <div class="playlist__btns">
                    <el-button type="danger" round @click="handlePlayAll">
                        <i class="iconfont icon-Playerplay"></i> 
                        <span>播放全部</span>
                        <i class="el-icon-plus" @click.stop="handleAddAll"></i> 
                    </el-button>
                    <el-button round :disabled="!data.playlist.subscribed">
                        <i class="el-icon-folder-add"></i>
                        收藏({{numFormat(data.playlist.subscribedCount)}})
                    </el-button>
                    <el-button round @click="handleShare">
                        <i class="el-icon-share"></i>
                        分享({{numFormat(data.playlist.shareCount)}})
                    </el-button>
                    <el-button round @click="handleDownloadAll">
                        <i class="iconfont icon-xiazai1"></i>
                        下载全部
                    </el-button>
                </div>
                <p class="playlist__count">
                    <span>歌曲 : {{numFormat(data.playlist.trackCount)}}</span>
                    <span>播放 : {{numFormat(data.playlist.playCount)}}</span>
                </p>
            </div>
        </div>
        <el-tabs v-model="activeName" @tab-click="handleTabClick">
            <el-tab-pane label="歌曲列表" name="first"><List :list="data.privileges" /></el-tab-pane>
            <el-tab-pane :label="`评论(${data.playlist.commentCount})`" name="second"><Comments /></el-tab-pane>
            <el-tab-pane label="收藏者" name="third"><Collectors /></el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
import { inject, onActivated, ref } from 'vue';
import { onBeforeRouteUpdate, useRoute } from 'vue-router';
import List from './components/List';
import Comments from './components/Comments';
import Collectors from './components/Collectors';
export default {
    components: {
        List,
        Comments,
        Collectors
    },
    setup() {
        const activeName = ref('first');
        const data = ref({});
        const route = useRoute();
        const { getPlaylist } = inject('api').music.find;
        const getPlaylistDetail = async id=> {
            const res = await getPlaylist(id);

            data.value = res;
            console.log('歌单详情：', data.value);
        };
        const getDate = time=> {
            const date = new Date(time);
            const year = date.getFullYear();
            const month = date.getMonth() + 1;
            const day = date.getDate();

            return `${year}-${month[1] ? month : '0' + month}-${day[1] ? day : '0' + day}`;
        };
        const handleAddAll = ()=> {
            console.log('添加全部到歌单');
        };
        const handlePlayAll = ()=> {
            console.log('播放全部');
        };
        const handleShare = ()=> {
            console.log('分享歌单');
        };
        const handleDownloadAll = ()=> {
            console.log('下载全部');
        };
        const handleTabClick = (tab, event)=> {
            console.log(tab, event);
        };
        const numFormat = n=> {
            return +n > 10000 ? Math.floor(n / 10000) + '万' : n;
        };


        onActivated(()=> {
            getPlaylistDetail(route.params.id);
        })

        // 后续keep-alive下相同路径不同params不会触发Activated
        onBeforeRouteUpdate((to, from)=> {
            if (to.name === from.name && to.name === 'musicPlaylist' && to.params.id !== from.params.id) {
                getPlaylistDetail(to.params.id);
            }
        })
        return {
            data,
            activeName,
            getDate,
            handleAddAll,
            handlePlayAll,
            handleDownloadAll,
            handleShare,
            handleTabClick,
            numFormat
        }
    }
}
</script>

<style lang="less" scoped>
.align-center {
    display: flex;
    align-items: center;
}
.playlist-header {
    display: flex;
    padding: 37px;
}
.playlist__name {
    margin: 0 0 10px 0;
    .playlist__nameContent {
        padding-left: 12px;
        font-size: 28px;
    }
}
.playlist__cover {
    border-radius: 5px;
    border: 1px solid #ebeef5;
}
.playlist__des {
    flex-grow: 1;
    padding: 0 20px;
    .el-tag {
        height: 25px;
        padding: 0 5px;
        font-size: 16px;
        line-height: 25px;
        font-weight: normal;
    }
}
.playlist__creator {
    .align-center;
    margin-bottom: 10px;
    line-height: 40px;
}
.playlist__creatorName {
    margin-left: 10px;
}
.playlist__createTime {
    margin-left: 10px;
    font-size: 15px;
    color: #606266;
}
.playlist__btns {
    .el-button {
        padding: 7px 20px;
        border-radius: 70px;
        font-size: 18px;
        line-height: 24px;
        &:nth-of-type(1) {
            padding: 7px 5px 7px 15px;
            span {
                position: relative;
                &::after {
                    content: '';
                    position: absolute;
                    top: -7px;
                    right: -8px;
                    height: 36px;
                    width: 1px;
                    background-color: #ddd;
                    opacity: 0.3;
                }
            }
        }
        i {
            padding-right: 5px;
        }
        .el-icon-plus {
            margin-left: 15px;
            z-index: 5;
        }
    }
}
.playlist__count {
    color: #333;
    span {
        margin-right: 20px;
    }
}
.el-tabs {
    padding: 0 40px;
    &:deep(.el-tabs__nav-wrap::after) {
        display: none;
    }
    &:deep(.el-tabs__item.is-active) {
        font-weight: bold;
        color: #333;
    }
    &:deep(.el-tabs__item) {
        &:hover {
            color: #333;
        }
        font-size: 18px;
    }
    &:deep(.el-tabs__active-bar) {
        height: 4px;
        background-color: red;
    }
    
    
}
</style>