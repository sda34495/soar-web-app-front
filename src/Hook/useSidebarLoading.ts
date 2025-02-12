'use client';
import { endLoadingAction } from '@/store/loader-slice';
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';


const useSidebarLoading = () => {
    const dispatch = useDispatch();

    useEffect(() => {
      
      dispatch(endLoadingAction.endLoading(100))
    }, [dispatch])

   
}

export default useSidebarLoading




