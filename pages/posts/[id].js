import { getAllPostIds, getPostData } from '../../helpers/posts'
import Head from 'next/head'
import utilStyles from '../../styles/utils.module.css'
import Link from 'next/link'
import Date from '../../components/Date'

export default function Post({ postData }) {
  return (
    <div>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <div className={utilStyles.back_button}>
      <Link href="/">
      <a className="noDecoration">
        <p className={utilStyles.back_button_background}>back</p>
        </a>
          </Link>
      </div>
    <div className="container">
      <article>
       <div>
       <h1 className={utilStyles.headingXl}>{postData.title}</h1>
        <div className={utilStyles.lightText}>
          <Date dateString={postData.date} />
        </div></div> 
        
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </article>
    </div>
    </div>
  )
}

export async function getStaticPaths() {
  const paths = getAllPostIds()
  return {
    paths,
    fallback: false
  }
}

export async function getStaticProps({ params }) {
  const postData = await getPostData(params.id)
  return {
    props: {
      postData
    }
  }
}
