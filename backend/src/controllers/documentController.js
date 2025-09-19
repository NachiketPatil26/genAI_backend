const documentController = {
  upload: (req, res) => {
    console.log('[DocumentController] Received request for document upload');
    res.json({ message: 'Document upload endpoint' });
  },
  getDocument: (req, res) => {
    console.log(
      `[DocumentController] Received request to get document ${req.params.id}`,
    );
    res.json({ message: `Get document ${req.params.id}` });
  },
};

module.exports = documentController;
