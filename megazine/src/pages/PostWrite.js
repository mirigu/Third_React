import React from "react";
import { Grid, Image, Text, Input, Button } from "../elements";
import Upload from "../shared/Upload";

import { useSelector, useDispatch } from "react-redux";
import { actionCreators as postActions } from "../redux/modules/post";
import { actionCreators as imageActions } from "../redux/modules/image";

const PostWrite = (props) => {
  const dispatch = useDispatch();
  const is_login = useSelector((state) => state.user.is_login);
  const preview = useSelector((state) => state.image.preview);
  const post_list = useSelector((state) => state.post.list);

  console.log(props.match.params.id);

  const post_id = props.match.params.id;
  const is_edit = post_id ? true : false;

  const { history } = props;

  let _post = is_edit ? post_list.find((p) => p.id === post_id) : null;

  console.log(_post);

  const [contents, setContents] = React.useState(_post ? _post.contents : "");

  React.useEffect(() => {
    if (is_edit && !_post) {
      console.log("post 정보가 없어요!");
      history.goBack();

      return;
    }

    if (is_edit) {
      dispatch(imageActions.setPreview(_post.image_url));
    }
  }, []);

  const changeContents = (e) => {
    setContents(e.target.value);
  };

  const addPost = () => {
    dispatch(postActions.addPostFB(contents));
    history.replace("/");
  };

  //로그인 하지 않았을 경우,
  if (!is_login) {
    return (
      //로그인하라는 페이지 보여주기
      <Grid padding="16px" center>
        <Text size="24px" bold>
          앗! 잠깐!
        </Text>
        <Text size="16px">로그인 후에만 글을 쓸 수있어요!</Text>
        <Button
          _onClick={() => {
            history.replace("/");
          }}
        >
          로그인 하러가기
        </Button>
      </Grid>
    );
  }
  //로그인되어 있는경우, 게시글 작성 페이지 보여주기
  return (
    <React.Fragment>
      <Grid padding="16px">
        <Text size="24px" bold>
          게시글 작성
        </Text>
        <Upload />
      </Grid>
      <Grid padding="16px">
        <Grid>
          <Text margin="5px 0px" size="14px" bold>
            미리보기
          </Text>
          <Image
            shape="rectangle"
            margin="0px 0px 20px 0px"
            src={preview ? preview : "http://via.placeholder.com/400x300"}
          />
        </Grid>
        <Grid>
          <Input
            _onChange={changeContents}
            value={contents}
            multiLine
            label="게시글 내용"
            placeholder=" 게시글 작성"
          />
        </Grid>
        <Grid padding="16px 0px">
          <Button _onClick={addPost}>게시물 작성</Button>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default PostWrite;
