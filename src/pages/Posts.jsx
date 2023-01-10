import React, {useEffect, useState}  from 'react';
import '../styles/App.css'
import TaskList from '../components/TaskList';
import MyButton from '../components/UI/button/MyButton';
import TaskForm from '../components/TaskForm';
import PostFilter from '../components/PostFilter';
import MyModal from '../components/UI/MyModal/MyModal';
import {usePosts} from "../hooks/usePosts";
import PostService from '../API/PostService';
import MyLoader from '../components/UI/Loader/MyLoader';
import useFetching from '../hooks/useFetching';
import { getPagesCount, getPagesArray } from '../components/utils/page';
import MyPagination from '../components/UI/pagination/MyPagination';

function Posts() {
  const [posts, setPosts] = useState([])

  const [filter, setFilter] = useState({sort:'', query:''})

  const [modal, setModal] = useState(false)
  const [limit, setLimit] = useState(10)
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)

  const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query)

  let pagesArray = getPagesArray(totalPages)

  const [fetchPosts, isPostsLoading, postError] = useFetching(async () => {
    const response = await PostService.getAll(limit, page)
    setPosts(response.data)
    const totalCount = response.headers['x-total-count']
    setTotalPages(getPagesCount(totalCount, limit))
  })

  useEffect(() =>{
    fetchPosts(limit, page)
  }, [page])

  const createPost = (newPost) => {
    setPosts([...posts, newPost])
    setModal(false)
  }

  const removePost = (post) => {
    setPosts(posts.filter(p => p.id !== post.id))
  }

  const changePage = (page) => {
    setPage(page)
    fetchPosts(limit, page)
  };

  return (
    <div className="App">
      <MyButton style={{marginTop:30}} onClick={() => setModal(true)}>
        Создать задачу
      </MyButton>
      <MyModal visible={modal} setVisible={setModal}>
        <TaskForm create={createPost}/>
      </MyModal>
      <hr style={{margin:'15px'}}></hr>
      <PostFilter
        filter={filter}
        setFilter={setFilter}
      />
       {postError &&
       <h1 style={{textAlign:'center'}}>Произошла ошибка {postError}</h1>
       } 
       {isPostsLoading
        ? <div style={{display:'flex', justifyContent: 'center', marginTop:50}}>
            <MyLoader/>
          </div>
        : <TaskList remove={removePost} posts={sortedAndSearchedPosts} title="Список задач"/>
       }
       <MyPagination 
       page={page}
       changePage={changePage}
       totalPages={totalPages}
       />
    </div>
  );
}

export default Posts;