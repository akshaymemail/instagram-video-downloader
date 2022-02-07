import { parse } from 'node-html-parser'
export const getCaptionFromHtml = async (html) => {
  const root = parse(html)

  let caption = root.querySelector('.Caption')?.text
  if (caption == undefined) caption = 'No caption'

  caption = caption.replace('view all comments', '')
  return caption
}

export const getVideoLinkFromHtml = (html) => {
  let crop =
    '{"' +
    html.substring(html.search('video_url'), html.search('video_url') + 1000)

  crop = crop.substring(0, crop.search(',')) + '}'

  return JSON.parse(crop).video_url
}
