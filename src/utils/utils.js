export const mapCard = (card) => ({
    name: card.name,
    link: card.link,
    id: card._id,
    likeCount: card.likes.length,
    owner: card.owner,
    likes: card.likes,
})
