import { userRepository } from "../dao/repositories/users.repository.js";

export async function updateUserRole(req, res) {
  try {
    const { uid } = req.params;
    const { route } = req;

    let newRole;
    if (route.path.includes("/premium")) {
      
      newRole = "PREMIUM";
    } else if (route.path.includes("/user")) {
      newRole = "USER";
    } else {
      return res.status(400).json({ message: "Invalid route" });
    }

    const user = await userRepository.updateUserRole(uid, newRole);

    res.json({ message: "User role updated successfully", user });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: ` ${error} ` });
  }
}

export async function updateUserDocumentStatus(req, res) {
  try {
    
    const { uid } = req.params;
    const uploadedDocuments = req.files

    await userRepository.updateUserDocumentStatus(uid, uploadedDocuments)

    return res.status(200).json({ message: "Documentos subidos y estado del usuario actualizado." });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error al subir documentos y actualizar el estado del usuario." });
  }

}


