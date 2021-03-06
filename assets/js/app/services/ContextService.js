(function () {
    angular.module("services").factory("context", context);

    context.$inject = [
        'EventsService',
        'UserDocumentsServiceFactory',
        'GroupDocumentsServiceFactory'
    ];

    function context(EventsService,
                     UserDocumentsServiceFactory,
                     GroupDocumentsServiceFactory) {

        let researchEntity, documentService;
        const service = {
            setResearchEntity: setResearchEntity,
            getResearchEntity: getResearchEntity,
            reset: reset,
            getDocumentService: getDocumentService
        };

        EventsService.subscribe(service, EventsService.AUTH_LOGIN, (e, re) => setResearchEntity(re));
        EventsService.subscribe(service, EventsService.AUTH_LOGOUT, () =>  reset());

        return service;

        function getResearchEntity(){
            return researchEntity;
        }

        function setResearchEntity(re){
            researchEntity = re;
            if (researchEntity.getType() === 'user')
                documentService = UserDocumentsServiceFactory.create(researchEntity);
            else
                documentService = GroupDocumentsServiceFactory.create(researchEntity);


            EventsService.publish(EventsService.CONTEXT_CHANGE);
        }

        function reset( ) {
            researchEntity = null;
            documentService = null;
        }

        function getDocumentService() {
            return documentService;
        }
    }
}());