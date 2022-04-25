function updateMap() {
    // Affichage à la nouvelle position
    mymap.setView([lat, lng], zoom);
    // La fonction de validation du formulaire renvoie false
    // pour bloquer le rechargement de la page.
    return false;
}

// MàJ de l'indicateur numérique du zoom
function updateZoomValue() {
    $('#zoomValue').html($('#zoom').val());
    updateMap();
}

// Abonnement aux événements de changement
$('#lat').change(updateMap);
$('#lon').change(updateMap);
$('#zoom').change(updateZoomValue);

export {
    updateMap,
    updateZoomValue
}