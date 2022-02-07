import axios from 'axios'
import { parse } from 'node-html-parser'
import {
  getCaptionFromHtml,
  getVideoLinkFromHtml,
} from '../../helpers/instagram.js'
export const getLinkController = (req, res) => {
  const { url } = req.body
  const regex = /(?:https?:\/\/)?(?:www\.)?instagram\.com\/reel\/([^\/]+)\/?/
  const match = url.match(regex)
  if (match) {
    const shortcode = match[1]
    const instagramUrl = `https://www.instagram.com/reel/${shortcode}/`
    axios
      .get(`${instagramUrl}embed/captioned`)
      .then(async (response) => {
        const root = parse(response.data)
        let link = ''
        if (response.data.search('video_url') != -1)
          link = getVideoLinkFromHtml(response.data)
        else
          link = root
            .querySelector('img.EmbeddedMediaImage')
            .getAttribute('src')

        while (link.search('&amp;') != -1) {
          link = link.replace('&amp;', '&')
        }
        let caption = await getCaptionFromHtml(response.data)

        res.status(200).json({
          link,
          caption,
        })
      })
      .catch((err) => {
        res.status(400).json({
          success: false,
          error: err.message,
        })
      })
  } else {
    res.status(400).json({
      error: 'Invalid URL',
    })
  }
}
