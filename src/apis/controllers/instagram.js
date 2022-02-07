export const getLinkController = (req, res) => {
  const { url } = req.body
  const regex = /(?:https?:\/\/)?(?:www\.)?instagram\.com\/p\/([^\/]+)\/?/
  const match = url.match(regex)
  if (match) {
    const shortcode = match[1]
    const instagramUrl = `https://www.instagram.com/p/${shortcode}/`
    res.status(200).json({
      instagramUrl,
    })
  } else {
    res.status(400).json({
      error: 'Invalid URL',
    })
  }
}
