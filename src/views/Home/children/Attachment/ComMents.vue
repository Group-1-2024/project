<template>
  <Button type="" @click="showDrawer" ghost="ture"></Button>
  <Drawer
    v-model:open="open"
    class="custom-class"
    placement="bottom"
    height="850px"
    closable="false"
    @after-open-change="afterOpenChange"
  >
    <div><img src="../../../../../public/images/pl.png" alt="" /></div>
    <a-comment>
      <template #actions>
        <span key="comment-basic-like">
          <a-tooltip title="Like">
            <template v-if="action === 'liked'">
              <LikeFilled @click="like" />
            </template>
            <template v-else>
              <LikeOutlined @click="like" />
            </template>
          </a-tooltip>
          <span style="padding-left: 8px; cursor: auto">
            {{ likes }}
          </span>
        </span>
        <span key="comment-basic-dislike">
          <a-tooltip title="Dislike">
            <template v-if="action === 'disliked'">
              <DislikeFilled @click="dislike" />
            </template>
            <template v-else>
              <DislikeOutlined @click="dislike" />
            </template>
          </a-tooltip>
          <span style="padding-left: 8px; cursor: auto">
            {{ dislikes }}
          </span>
        </span>
        <span key="comment-basic-reply-to">Reply to</span>
      </template>
      <template #author><a>Han Solo</a></template>
      <template #avatar>
        <a-avatar src="https://joeschmoe.io/api/v1/random" alt="Han Solo" />
      </template>
      <template #content>
        <p>
          We supply a series of design principles, practical patterns and high
          quality design resources (Sketch and Axure), to help people create
          their product prototypes beautifully and efficiently.
        </p>
      </template>
      <template #datetime>
        <a-tooltip :title="dayjs().format('YYYY-MM-DD HH:mm:ss')">
          <span>{{ dayjs().fromNow() }}</span>
        </a-tooltip>
      </template>
    </a-comment>
    <a-list
      v-if="comments.length"
      :data-source="comments"
      :header="`${comments.length} ${
        comments.length > 1 ? 'replies' : 'reply'
      }`"
      item-layout="horizontal"
    >
      <template #renderItem="{ item }">
        <a-list-item>
          <a-comment
            :author="item.author"
            :avatar="item.avatar"
            :content="item.content"
            :datetime="item.datetime"
          />
        </a-list-item>
      </template>
    </a-list>
    <a-comment>
      <template #avatar>
        <a-avatar src="https://joeschmoe.io/api/v1/random" alt="Han Solo" />
      </template>
      <template #content>
        <a-form-item>
          <a-textarea v-model:value="value" :rows="4" />
        </a-form-item>
        <a-form-item>
          <a-button
            html-type="submit"
            :loading="submitting"
            type="primary"
            @click="handleSubmit"
          >
            发表评论
          </a-button>
        </a-form-item>
      </template>
    </a-comment>
  </Drawer>
</template>
<script setup>
import { ref } from "vue";
import dayjs from "dayjs";
import { Button, Drawer } from "ant-design-vue";
import relativeTime from "dayjs/plugin/relativeTime";

const open = ref(false);

const afterOpenChange = (bool) => {
  console.log("open", bool);
};
const showDrawer = () => {
  open.value = true;
};

dayjs.extend(relativeTime);
const comments = ref([]);
const submitting = ref(false);
const value = ref("");
const handleSubmit = () => {
  if (!value.value) {
    return;
  }
  submitting.value = true;
  setTimeout(() => {
    submitting.value = false;
    comments.value = [
      {
        author: "Han Solo",
        avatar: "https://joeschmoe.io/api/v1/random",
        content: value.value,
        datetime: dayjs().fromNow(),
      },
      ...comments.value,
    ];
    value.value = "";
  }, 1000);
};
dayjs.extend(relativeTime);
const likes = ref(0);
const dislikes = ref(0);
const action = ref();
const like = () => {
  likes.value = 1;
  dislikes.value = 0;
  action.value = "liked";
};
const dislike = () => {
  likes.value = 0;
  dislikes.value = 1;
  action.value = "disliked";
};
</script>

<style></style>
