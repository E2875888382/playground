<template>
    <div class="list-container">
        <el-table 
            :data="list"
            stripe
            style="width: 99%"
            @row-contextmenu="openMenu"
            empty-text=" "
        >
            <el-table-column 
                label="音乐标题" 
                class-name="music__title" 
                header-align="center" 
                sortable sort-by="name" 
                min-width="200"
            >
                <template #default="scope">
                    <span class="light music__index">{{zero(scope.$index + 1)}}</span>
                    <i class="iconfont icon-1_music89 icon__like"></i>
                    <i class="iconfont icon-xiazai1 icon__download"></i>
                    <span class="black">{{scope.row.name}}</span>
                    <span class="light" v-if="scope.row.alia.length">
                        {{'('+ scope.row.alia.join('/') + ')'}}
                    </span>
                    <span v-if="scope.row.mv" class="icon-mv">
                        MV<i class="iconfont icon-Playerplay"></i>
                    </span>
                </template>
            </el-table-column>
            <el-table-column 
                label="歌手" 
                min-width="80" 
                sortable sort-by="ar"
            >
                <template #default="scope">
                    {{getAuthors(scope.row.ar)}}
                </template>
            </el-table-column>
            <el-table-column 
                prop="al.name" 
                label="专辑"
                min-width="100" 
                sortable sort-by="al.name"
            />
            <el-table-column 
                label="时长" 
                min-width="35" 
                sortable sort-by="dt"
            >
                <template #default="scope">
                    {{getTime(scope.row.dt)}}
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
import { inject } from 'vue';
import { useStore } from 'vuex';
export default {
    props: {
        list: Array
    },
    setup() {
        const menu = inject('menu');
        const store = useStore();
        const getAuthors = arr=> arr.map(item=> item.name).join('/');
        const zero = inject('zeroNum');
        const getTime = inject('msFormat');
        const openMenu = row=> {
            menu([
                {
                    label: '播放',
                    click() {
                        store.commit('music/addToPlaylist', row);
                        store.commit('music/updateCurrentMusicIndex', row);
                        store.commit('music/addToHistory', row);
                    }
                },
                {
                    label: '下一首播放',
                    click() {

                    }
                },
                {
                    label: '添加到歌单',
                    click() {
                        store.commit('music/addToPlaylist', row);
                    }
                },
                {
                    label: '下载',
                    click() {

                    }
                }
            ]);
        };

        return {
            getAuthors,
            getTime,
            zero,
            openMenu
        }
    }
}
</script>

<style lang="less" scoped>
.light {
    color: #c0c4cc9c;
}
.black {
    color: #333;
}
.list-container {
    max-width: 100%;
    padding-left: 15px;
    &:deep(.el-table .cell) {
        font-weight: 400;
        font-size: 16px;
        color: #606266d6;
        .font-overflow;
        -webkit-line-clamp: 1;
    }
}

.music__title {
    padding-left: 15px;
    .icon-mv {
        padding-left: 2px;
        margin-left: 5px;
        font-size: 12px;
        line-height: 15px;
        color: red;
        border: 1px solid red;
        border-radius: 4px;
        .icon-Playerplay {
            font-size: 12px;
            line-height: 18px;
        }
    }
}
.music__index {
    margin-right: 20px;
}
.icon__like,
.icon__download {
    margin-right: 10px;
    font-size: 20px;
}
</style>