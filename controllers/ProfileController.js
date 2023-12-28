// ProfileController.js
class ProfileController {
    static editProfileImage = async (req, res) => {
      const { id } = req.params
      const filePath = req.files.location
      if (!filePath) {
        throw new CustomError({
          status: 401,
          Response: {
            message: "Invalid file path"
          }
        })
      }
      const profile = await ProfileService.updateProfile(
        new Types.ObjectId(profileId),
        { photoUrl: filePath }
      )
      res.status(200).send(profile)
    }
  }
  
  export default ProfileController;
  