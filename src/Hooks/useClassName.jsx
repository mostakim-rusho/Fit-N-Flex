import useAxiosPublic from './useAxiosPublic';
import { useQuery } from '@tanstack/react-query';

const useClassName = () => {
    const axiosPublic = useAxiosPublic();

    const { data : classes = [], isLoading } = useQuery({
        queryKey: ['classes'],
        queryFn: async () => {
            const { data } = await axiosPublic.get(`/allClassName`);
            return data;
        }
    })

    return { classes, isLoading };
};

export default useClassName;